'use client';
import React, { useState, useEffect } from 'react';

export default function HaberlerPage() {
  const [haberler, setHaberler] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchHaberler = async () => {
      try {
        const res = await fetch('/api/haberler');
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
      <h1 style={{color:'#fbbf24'}}>Haber Yonetimi v11.3 (Fixed)</h1>
      {message && <p>{message}</p>}
      <div>{haberler.map((h, i) => <div key={i}>{h.title || 'Haber'}</div>)}</div>
    </div>
  );
}
