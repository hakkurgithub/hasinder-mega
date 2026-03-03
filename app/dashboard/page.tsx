'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function D(){
  const [t,setT]=useState([]);
  const [l,setL]=useState(false);
  const get=async()=>{
    const {data}=await sb.from('trades').select('*').order('created_at',{ascending:false});
    if(data) setT(data);
  };
  useEffect(()=>{get();},[]);
  const add=async()=>{
    setL(true);
    const {error}=await sb.from('trades').insert([{title:'OPERASYON TAMAM',amount:'10M TL',status:'AKTIF'}]);
    if(!error){ alert('BASARILI!'); get(); }
    setL(false);
  };
  return(
    <div style={{padding:'100px',textAlign:'center',background:'#f0f2f5',minHeight:'100vh',fontFamily:'sans-serif'}}>
      <div style={{background:'#fff',padding:'40px',borderRadius:'30px',boxShadow:'0 20px 50px rgba(0,0,0,0.1)',display:'inline-block'}}>
        <h1 style={{color:'#1B365D',margin:'0'}}>TIB HUB v10.3</h1>
        <p style={{color:'#888',marginBottom:'30px'}}>Fabrika Artik Yayinda ve Hazir.</p>
        <button onClick={add} disabled={l} style={{padding:'20px 50px',background:'#1B365D',color:'#D4AF37',fontWeight:'bold',borderRadius:'20px',cursor:'pointer',border:'none',fontSize:'20px'}}>
          {l ? 'ISLEMDE...' : '+ ICRAAT EKLE'}
        </button>
        <div style={{marginTop:'40px',textAlign:'left'}}>
          {t.map(x=><div key={x.id} style={{padding:'15px',borderBottom:'1px solid #eee'}}><b>{x.title}</b> - {x.amount}</div>)}
        </div>
      </div>
    </div>
  );
}
