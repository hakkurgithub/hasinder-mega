import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark">
      <body className="bg-gray-900 text-white min-h-screen">
        <Header />
        <main className="min-h-screen bg-gray-900 text-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
