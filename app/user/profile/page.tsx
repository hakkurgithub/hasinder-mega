export default function UserProfile() {
  return (
    <div className="p-10 bg-white min-h-screen text-[#1B365D]">
      <h1 className="text-2xl font-bold mb-6">Üyelik Bilgilerim</h1>
      <form className="max-w-md space-y-4">
        <input type="text" placeholder="Ad Soyad" className="w-full p-3 border rounded-lg" />
        <input type="email" placeholder="E-posta" className="w-full p-3 border rounded-lg" />
        <button className="w-full bg-[#1B365D] text-white py-3 rounded-xl font-bold">GÜNCELLE</button>
      </form>
    </div>
  );
}
