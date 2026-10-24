import {readFileSync} from 'node:fs';
const c=JSON.parse(readFileSync(new URL('../content/site.json',import.meta.url),'utf8'));
function check(ok,message){if(!ok)throw new Error(message)}
function pair(v,path){for(const l of ['en','ml'])check(typeof v?.[l]==='string'&&v[l].trim()&&v[l].length<=5000,`${path}.${l}: enter text (up to 5000 characters)`)}
function url(v,path,optional=false){if(optional&&!v)return;try{const u=new URL(v);check(u.protocol==='https:',`${path}: use https://`)}catch{throw Error(`${path}: enter a valid https:// URL`)}}
function image(v,path){if(!v||/^\/images\/[\w.-]+$/.test(v))return;url(v,path)}
for(const k of ['name','eyebrow','headline','intro','bio'])pair(c[k],k);
image(c.portrait,'portrait');
for(const section of ['books','videos','links']){
 check(Array.isArray(c[section])&&c[section].length<=80,`${section}: expected an array of up to 80 items`);
 const ids=new Set();
 c[section].forEach((x,i)=>{const p=`${section}[${i}]`;check(typeof x.id==='string'&&x.id&&!ids.has(x.id),`${p}: use a unique id`);ids.add(x.id);pair(x.title,`${p}.title`);url(x.url,`${p}.url`);if(section!=='links')pair(x.description,`${p}.description`);if(section==='books'){pair(x.category,`${p}.category`);check(['English','Malayalam'].includes(x.language),`${p}.language: choose English or Malayalam`);image(x.cover,`${p}.cover`)}});
}
console.log(`Content validated: ${c.books.length} books, ${c.videos.length} videos, ${c.links.length} links.`);
