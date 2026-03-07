'use client';
import React, { useState, useEffect } from 'react';

// Haber yapisini tanımlayarak TypeScript'i sakinleştiriyoruz
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
        const data = await res.json();
        // Artik TypeScript 'data'nın 'Haber[]' olabileceğini biliyor
        setHaberler(Array.isArray(data) ? data : []);
      } catch (err) {
        setMessage('Haberler yuklenemedi');
      }
    };
    fetchHaberler();
  }, []);

  return (
    <div style={{padding:'20px', background:'#0f172a', minHeight:'100vh', color:'#fff'}}>
      <h1>Haber Yonetimi</h1>
      {message && <p>{message}</p>}
      <div>{haberler.map(h => <div key={h.id}>{h.title}</div>)}</div>
    </div>
  );
}
