import { z } from 'zod';
import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../chatgpt-auth';
import { initialContent, contentSchema } from '../../content';
export const dynamic='force-dynamic';
export async function GET(){
 try {
 if(!env.DB)throw Error('Database unavailable');
 const row=await env.DB.prepare('SELECT content, revision FROM site_content WHERE id = 1').first<{content:string,revision:number}>();
 return Response.json({content:row?JSON.parse(row.content):initialContent,revision:row?.revision??0},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Content is temporarily unavailable. Please try again.'},{status:503});}
}
export async function PUT(request:Request){
 const user=await getChatGPTUser();
 if(!user)return Response.json({error:'Sign in to edit this website.'},{status:401});
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Invalid origin'},{status:403});
 if(Number(request.headers.get('content-length')||0)>500000)return Response.json({error:'Content is too large'},{status:413});
 try{
 if(!env.DB)throw Error('Database unavailable');
 const envelope=z.object({content:contentSchema,revision:z.number().int().nonnegative()}).safeParse(await request.json());
 if(!envelope.success)return Response.json({error:'Check the fields and links.'},{status:400});
 const body=envelope.data; const parsed=contentSchema.safeParse(body.content);
 if(!parsed.success || !Number.isInteger(body.revision)||body.revision<0)return Response.json({error:'Please check the fields. Links must start with https://.'},{status:400});
 const content=JSON.stringify(parsed.data);
 if(content.length>400000)return Response.json({error:'Content is too large'},{status:413});
 // The first editor is established behind the owner-private Sites access boundary.
 // Later writes remain bound to that identity, even if the audience changes.
 await env.DB.prepare('INSERT OR IGNORE INTO site_content (id,content,revision,editor_id) VALUES (1,?,0,?)').bind(JSON.stringify(initialContent),user.userId).run();
 const row=await env.DB.prepare('SELECT editor_id FROM site_content WHERE id=1').first<{editor_id:string}>();
 if(row?.editor_id!==user.userId)return Response.json({error:'Only the designated editor can save changes.'},{status:403});
 const result=await env.DB.prepare('UPDATE site_content SET content=?,revision=revision+1 WHERE id=1 AND revision=? AND editor_id=?').bind(content,body.revision,user.userId).run();
 if(!result.meta.changes)return Response.json({error:'Another edit was saved. Reload this page before editing again.'},{status:409});
 return Response.json({revision:body.revision+1});
 }catch{return Response.json({error:'Could not save. Your edits are still here; please try again.'},{status:500});}
}
