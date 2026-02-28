import React, { useState } from 'react';

export default function OtpVerification({ onVerify }: { onVerify: (code: string) => void }) {
  const [code, setCode] = useState('');

  return (
    <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
      <h3 className="text-sm font-black text-blue-900 mb-2 uppercase tracking-tighter">
        ��� KVKK GÜVENLİ DOĞRULAMA (28.02.2026)
      </h3>
      <p className="text-xs text-blue-700 mb-4">
        İlke kararı gereği, işleminize devam etmek için telefonunuza gelen 6 haneli kodu giriniz.
      </p>
      <input 
        type="text" 
        maxLength={6} 
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-3 text-center text-2xl font-mono tracking-[0.5em] border-2 border-blue-300 rounded-lg focus:border-[#D4AF37] outline-none"
        placeholder="000000"
      />
      <button 
        onClick={() => onVerify(code)}
        className="w-full mt-4 bg-[#1B365D] text-white py-3 rounded-lg font-bold hover:bg-[#D4AF37] transition-all"
      >
        İŞLEMİ ONAYLA VE KAYDET
      </button>
    </div>
  );
}
