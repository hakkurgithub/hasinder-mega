import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'HAS INSANDER - Istanbul & Hatay Sanayici ve Is Insanlari Platformu',
  description: 'Istanbul ve Hatay sanayici ve is insanlarinin yatirim ve is birligi platformu. TIB Ticaret Agi ile otonom guvenli ticaret.',
  keywords: ['hasinsander', 'hatay', 'istanbul', 'sanayici', 'is insanlari', 'ticaret', 'yatirim'],
  authors: [{ name: 'HAS INSANDER' }],
  openGraph: {
    title: 'HAS INSANDER - Yatirim ve Is Birligi Platformu',
    description: 'Istanbul ve Hatay sanayicilerinin bulusma noktasi',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B365D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="antialiased font-sans">
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
