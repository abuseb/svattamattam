import { z } from 'zod';
const line=z.string().max(5000);
const link=z.string().max(2000).refine(v=> /^https:\/\//.test(v), 'Use an https:// link');
const image=z.string().max(2000).refine(v=>!v || /^https:\/\//.test(v)|| /^\/images\/[\w.-]+$/.test(v), 'Use an https:// image link');
const pair=z.object({en:line,ml:line});
export const contentSchema=z.object({
 name:pair, eyebrow:pair, headline:pair, intro:pair, bio:pair, portrait:image,
 books:z.array(z.object({id:z.string().max(80),title:pair,description:pair,language:z.enum(['English','Malayalam']),category:pair,url:link,cover:image})).max(80),
 videos:z.array(z.object({id:z.string().max(80),title:pair,description:pair,url:link})).max(80),
 links:z.array(z.object({id:z.string().max(80),title:pair,url:link})).max(40)
});
export type Content=z.infer<typeof contentSchema>;
export type Lang='en'|'ml';
export const initialContent:Content={
 name:{en:'Sebastian Vattamattam',ml:'സെബാസ്റ്റ്യൻ വട്ടമറ്റം'},
 eyebrow:{en:'WRITER · EDUCATOR · THINKER',ml:'എഴുത്തുകാരൻ · അധ്യാപകൻ · ചിന്തകൻ'},
 headline:{en:'A life in pursuit\nof understanding.',ml:'അറിവും അന്വേഷണവും\nനിറഞ്ഞ ഒരു ജീവിതം.'},
 intro:{en:'Exploring the meeting places of language, philosophy and everyday life. Writing in English and Malayalam, from Kerala to the world.',ml:'ഭാഷയും തത്ത്വചിന്തയും നിത്യജീവിതവും സംഗമിക്കുന്ന ഇടങ്ങളിലൂടെ. കേരളത്തിൽ നിന്ന് ലോകത്തേക്ക്, മലയാളത്തിലും ഇംഗ്ലീഷിലും.'},
 bio:{en:'Sebastian Vattamattam is a writer and mathematics educator from Kerala. Born in Neyyassery in 1945, he taught in Goa, Nigeria, Qatar and Changanassery. His books in Malayalam and English explore language, psychoanalysis, philosophy and mathematics. Based in Ettumanoor, he is also the convener of Ettumanoor Kavya Vedi, a forum for poets.',ml:'കേരളത്തിൽ നിന്നുള്ള എഴുത്തുകാരനും ഗണിതശാസ്ത്ര അധ്യാപകനുമാണ് സെബാസ്റ്റ്യൻ വട്ടമറ്റം. 1945-ൽ നെയ്യശ്ശേരിയിൽ ജനിച്ച അദ്ദേഹം ഗോവ, നൈജീരിയ, ഖത്തർ, ചങ്ങനാശ്ശേരി എന്നിവിടങ്ങളിൽ അധ്യാപകനായി പ്രവർത്തിച്ചു. ഭാഷ, മനോവിശ്ലേഷണം, തത്ത്വചിന്ത, ഗണിതശാസ്ത്രം എന്നിവയാണ് അദ്ദേഹത്തിന്റെ മലയാളം, ഇംഗ്ലീഷ് കൃതികളിലെ പ്രധാന വിഷയങ്ങൾ. ഏറ്റുമാനൂരിൽ താമസിക്കുന്ന അദ്ദേഹം ഏറ്റുമാനൂർ കാവ്യവേദിയുടെ കൺവീനറുമാണ്.'},
 portrait:'/images/sebastian.jpg',
 books:[
 {id:'elephants',title:{en:'Elephants in a Sugarcane Field',ml:'Elephants in a Sugarcane Field'},description:{en:'The Limits of Desire, God, Dreams, Language, Self. An inquiry through the ideas of Jacques Lacan and Slavoj Žižek.',ml:'ആഗ്രഹം, ദൈവം, സ്വപ്നം, ഭാഷ, സ്വത്വം എന്നിവയെ ലകാന്റെയും സ്ലാവോയ് സിസെക്കിന്റെയും ചിന്തകളിലൂടെ അന്വേഷിക്കുന്ന കൃതി.'},language:'English',category:{en:'Philosophy · Navayana',ml:'തത്ത്വചിന്ത · നവയാന'},url:'https://navayana.org/products/elephants-in-a-sugarcane-field/',cover:''},
 {id:'curves',title:{en:'Book of Beautiful Curves',ml:'Book of Beautiful Curves'},description:{en:'Mathematical curves and an introduction to functional theoretic algebras.',ml:'മനോഹരമായ ഗണിത വക്രങ്ങളും ഫങ്ഷണൽ തിയററ്റിക് ആൽജിബ്രയ്ക്കൊരു ആമുഖവും.'},language:'English',category:{en:'Mathematics',ml:'ഗണിതശാസ്ത്രം'},url:'https://store.pothi.com/book/ebook-sebastian-vattamattam-book-beautiful-curves/',cover:''},
 {id:'folklore',title:{en:'Mariyammachedathiyude Manikkampennu',ml:'മറിയാമ്മച്ചേടത്തിയുടെ മാണിക്കം പെണ്ണ്'},description:{en:'A collection of folk songs and essays, published by Pavanatma Publishers in 2023.',ml:'നാടൻപാട്ടുകളുടെയും ലേഖനങ്ങളുടെയും സമാഹാരം. പാവനാത്മ പബ്ലിഷേഴ്സ്, 2023.'},language:'Malayalam',category:{en:'Folklore · Malayalam',ml:'നാടൻപാട്ടുകൾ · മലയാളം'},url:'https://www.atmabooks.com/product-page/mariyammachedathiyude-manikkampennu-nadanpattukalum-leghanangalum',cover:''},
 {id:'kappen',title:{en:'Collected Works of Sebastian Kappen: Volume I',ml:'സെബാസ്റ്റ്യൻ കാപ്പന്റെ സമാഹൃത കൃതികൾ: വാല്യം I'},description:{en:'Jesus and Freedom and related essays. Edited by Sebastian Vattamattam; published by ISPCK.',ml:'Jesus and Freedom ഉൾപ്പെടെയുള്ള ലേഖനങ്ങൾ. എഡിറ്റർ: സെബാസ്റ്റ്യൻ വട്ടമറ്റം. പ്രസാധകർ: ISPCK.'},language:'English',category:{en:'Edited works · ISPCK',ml:'എഡിറ്റ് ചെയ്ത കൃതികൾ · ISPCK'},url:'https://www.ispck.org.in/book/collected-work-of-sebastian-kappen-volume-1-jesus-and-freedom-and-related-essays',cover:''}
 ],
 videos:[
 {id:'symbolic',title:{en:'On Kappen’s symbolic revolution',ml:'കാപ്പന്റെ പ്രതീകവിപ്ലവത്തെക്കുറിച്ച്'},description:{en:'A Malayalam talk on the ideas of Sebastian Kappen.',ml:'സെബാസ്റ്റ്യൻ കാപ്പന്റെ ചിന്തകളെക്കുറിച്ചുള്ള മലയാള പ്രഭാഷണം.'},url:'https://www.youtube.com/watch?v=cO2gofMJOkc'},
 {id:'counterculture',title:{en:'On Kappen’s counterculture',ml:'കാപ്പന്റെ പ്രതിസംസ്കൃതിയെക്കുറിച്ച്'},description:{en:'Culture, dissent and the work of Sebastian Kappen.',ml:'സംസ്കാരം, വിയോജിപ്പ്, സെബാസ്റ്റ്യൻ കാപ്പന്റെ ചിന്തകൾ.'},url:'https://www.youtube.com/watch?v=ITcFs2mCyWA'},
 {id:'god',title:{en:'Random thoughts: on God',ml:'ചില ചിന്തകൾ: ദൈവത്തെക്കുറിച്ച്'},description:{en:'The first talk in the My Random Thoughts series.',ml:'My Random Thoughts പരമ്പരയിലെ ആദ്യ സംഭാഷണം.'},url:'https://www.youtube.com/watch?v=soIlQhoeK0g'}
 ],
 links:[{id:'publisher',title:{en:'Author profile at Navayana',ml:'നവയാനയിലെ എഴുത്തുകാരന്റെ പരിചയം'},url:'https://navayana.org/authors/2025/11/23/sebastian-vattamattam/'},{id:'hortus',title:{en:'At the Hortus literature festival',ml:'ഹോർത്തൂസ് സാഹിത്യോത്സവത്തിൽ'},url:'https://www.manoramahortus.com/speakerInner.html?pgrmId=412&speakerId=565'},{id:'excerpt',title:{en:'Read an excerpt on Scroll',ml:'Scroll-ൽ പുസ്തകഭാഗം വായിക്കുക'},url:'https://scroll.in/article/1090942/a-new-book-uses-zizeks-and-lacans-philosophies-to-examine-how-indian-social-reality-is-constructed'}]
};
export function videoId(url:string){try{const u=new URL(url); if(u.hostname==='youtu.be')return u.pathname.slice(1).match(/^[\w-]{11}$/)?.[0];if(['youtube.com','www.youtube.com'].includes(u.hostname))return u.searchParams.get('v')?.match(/^[\w-]{11}$/)?.[0];}catch{}return undefined;}
