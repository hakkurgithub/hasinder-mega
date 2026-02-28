import React from 'react';

export default function DeliverySeal() {
  return (
    <div className="p-8 bg-[#0A192F] min-h-screen text-white">
      <div className="max-w-md mx-auto border-2 border-[#D4AF37] p-6 rounded-3xl bg-blue-950/30 text-center">
        <h2 className="text-xl font-black mb-4 uppercase tracking-tighter">DİJİTAL TESLİMAT MÜHRÜ</h2>
        <div className="bg-white p-4 inline-block rounded-xl mb-6">
           {/* QR Kod Alanı - Simüle Edilmiştir */}
           <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-black text-xs">
             QR KOD TARANIYOR...
           </div>
        </div>
        <p className="text-[10px] text-blue-300 mb-6 italic">
          Bu kodu okuttuğunuzda, konumunuz ve kimliğiniz 28.02.2026 KVKK kararı uyarınca 'Teslimat Kanıtı' olarak mühürlenecektir.
        </p>
        <button className="w-full bg-[#D4AF37] text-[#0A192F] py-4 rounded-xl font-black">
          TESLİMATI ONAYLA
        </button>
      </div>
    </div>
  );
}
