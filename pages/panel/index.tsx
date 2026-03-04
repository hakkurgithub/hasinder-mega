import { useAuth } from '@/hooks/useAuth';

export default function Panel() {
  const { user, loading } = useAuth();

  if (loading) return <p>Kontrol ediliyor...</p>;
  if (!user || !user.isAdmin) return <p>Yetkisiz erişim. Lütfen giriş yapın.</p>;

  return (
    <div>
      <h1>Admin Paneli</h1>
      <p>Hoş geldin {user.email}, tüm yetki sende!</p>
      {/* Burada admin fonksiyonlarını ekleyebilirsin */}
    </div>
  );
}
