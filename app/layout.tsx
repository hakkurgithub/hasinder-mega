import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main className="min-h-[80vh] bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
