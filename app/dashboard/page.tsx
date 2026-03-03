'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function D(){
  const [t,setT]=useState([]);
  const [loading,setLoading]=useState(false);
  const get=async()=>{
    const {data}=await sb.from('trades').select('*').order('created_at',{ascending:false});
    if(data)setT(data);
  };
  useEffect(()=>{get();},[]);
  const add=async()=>{
    setLoading(true);
    const {error}=await sb.from('trades').insert([{title:'ICRAAT BUTONU OK',amount:'1.0M TL',status:'AKTIF'}]);
    if(error) alert('Hata: ' + error.message);
    else { alert('Islem Basarili!'); get(); }
    setLoading(false);
  };
  return(
    <div style={{padding:'50px',textAlign:'center',fontFamily:'sans-serif'}}>
      <h1 style={{color:'#1B365D'}}>TIB DASHBOARD v10.2</h1>
      <p>Buton tetiği tamir edildi. Lütfen basıp deneyin.</p>
      <button onClick={add} disabled={loading} style={{padding:'20px',background:'#1B365D',color:'#D4AF37',fontWeight:'bold',borderRadius:'15px',cursor:'pointer'}}>
        {loading ? 'YUKLENIYOR...' : '+ ICRAAT EKLE'}
      </button>
      <hr style={{margin:'20px'}}/>
      {t.map(x=><div key={x.id} style={{padding:'10px',borderBottom:'1px solid #eee'}}>{x.title} - {x.amount}</div>)}
    </div>
  );
}
