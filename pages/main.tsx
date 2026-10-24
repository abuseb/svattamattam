import React from 'react';
import {createRoot} from 'react-dom/client';
import AuthorSite from '../app/site';
import {contentSchema} from '../app/content';
import content from '../content/site.json';
import '../app/globals.css';
const validated=contentSchema.parse(content);
createRoot(document.getElementById('root')!).render(<AuthorSite staticContent={validated} assetBase={import.meta.env.BASE_URL}/>);
