'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const S_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const S_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const sb = createClient(S_URL, S_KEY);

export default function Panel() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getTrades = async () => {
    const { data, error } = await sb
      .from('trade') // 👈 tablo adı küçük harf
      .select('*')
      .order('createdAt', { ascending: false }); // 👈 kolon adı kontrol et
    if (error) {
      console.error('Veri çekme hatası:', error.message);
    }
    if (data) setTrades(data);
  };

  useEffect(() => {
    getTrades();
  }, []);

  const addTrade = async () => {
    setLoading(true);
    const { error } = await sb.from('trade').insert([
      { category: 'Gıda', title: 'Yeni İlan', amount: '100 Ton', status: 'AKTIF' }
    ]);
    if (error) {
      alert('İlan eklenirken hata oluştu: ' + error.message);
    } else {
      alert('İlan başarıyla eklendi!');
      getTrades();
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>TIB HUB Operational Center</h1>
      <button onClick={addTrade} disabled={loading}>
        {loading ? 'İşlemde...' : 'Yeni İlan / New Trade'}
      </button>

      <table>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Başlık</th>
            <th>Miktar</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade.id}>
              <td>{trade.category}</td>
              <td>{trade.title}</td>
              <td>{trade.amount}</td>
              <td>{trade.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
