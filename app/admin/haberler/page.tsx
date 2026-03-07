'use client';
import React, { useState, useEffect } from 'react';

export default function HaberlerPage() {
  const [haberler, setHaberler] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchHaberler = async () => {
      try {
        const res = await fetch('/api/haberler');
        if (!res.ok) throw new Error('Haberler alinamadi');
        const data = await res.json();
        setHaberler(Array.isArray(data) ? data : []);
      } catch (err) {
        setMessage('Haberler yuklenemedi');
      }
    };
    fetchHaberler();
  }, []);

  return (
    <div style={{padding:'20px', background:'#0f172a', minHeight:'100vh', color:'#fff'}}>
      <h1>Haber Yonetimi - v11.2</h1>
      {message && <p style={{color:'red'}}>{message}</p>}
      <div style={{marginTop:'20px'}}>
        {haberler.map((h, i) => (
          <div key={i} style={{padding:'10px', borderBottom:'1px solid #334155'}}>
            <h3>{h.title || 'Basliksiz Haber'}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
