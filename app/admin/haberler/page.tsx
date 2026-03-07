'use client';
import React, { useState, useEffect } from 'react';

interface Haber {
  id: string;
  title: string;
  content?: string;
}

export default function HaberlerPage() {
  const [haberler, setHaberler] = useState<Haber[]>([]);
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
        console.error(err);
      }
    };
    fetchHaberler();
  }, []);

  return (
    <div style={{padding:'20px', background:'#0f172a', minHeight:'100vh', color:'#fff'}}>
      <h1 style={{color:'#fbbf24'}}>Haber Yonetimi</h1>
      {message && <p style={{color:'red'}}>{message}</p>}
      <div style={{marginTop:'20px'}}>
        {haberler.map((h) => (
          <div key={h.id} style={{padding:'10px', borderBottom:'1px solid #334155'}}>
            <h3>{h.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
