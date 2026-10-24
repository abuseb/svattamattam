import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Sebastian Vattamattam — Words, ideas & a life of inquiry',description:'Explore the books, talks and writings of Sebastian Vattamattam in English and Malayalam.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
