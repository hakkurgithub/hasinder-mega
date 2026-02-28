export default function AdminDashboard() {
  return (
    <div className="p-10 bg-[#0A192F] min-h-screen text-white">
      <h1 className="text-3xl font-black text-[#D4AF37] mb-8">ADMIN MASTER CONTROL</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-900/30 border border-[#D4AF37] rounded-2xl">
          <h3 className="text-xs uppercase font-bold">Toplam Üye</h3>
          <p className="text-4xl font-black">1,284</p>
        </div>
        <div className="p-6 bg-blue-900/30 border border-[#D4AF37] rounded-2xl">
          <h3 className="text-xs uppercase font-bold">Günlük Hacim</h3>
          <p className="text-4xl font-black">₺2.4M</p>
        </div>
      
        <div className="mt-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-xl flex justify-between items-center">
          <div>
            <p className="text-[#D4AF37] font-bold text-xs uppercase">Yeni Üye Davet Linki</p>
            <p className="text-[10px] text-white/60 font-mono">https://hasinder.com/giris?code=HASINDER2026</p>
          </div>
          <button className="bg-[#D4AF37] text-[#0A192F] px-4 py-2 rounded-lg text-[10px] font-black uppercase">
            Link Kopyala
          </button>
        </div>
      </div>
    </div>
  );
}
