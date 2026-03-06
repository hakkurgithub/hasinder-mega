'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function TIB_HUB_V11(){
  const [data,setData]=useState([]);
  const [load,setLoad]=useState(false);
  
  const refresh=async()=>{
    const {data:res}=await sb.from('trades').select('*').order('created_at',{ascending:false});
    if(res) setData(res);
  };

  useEffect(()=>{refresh();},[]);

  const runOp=async()=>{
    setLoad(true);
    const {error}=await sb.from('trades').insert([{title:'v11.0 CANLI OPERASYON',amount:'25.5M TL',status:'AKTIF'}]);
    if(!error){ alert('MÜHÜR BASILDI: ISLEM BASARILI!'); refresh(); }
    setLoad(false);
  };

  return(
    <div style={{padding:'40px',background:'#0f172a',minHeight:'100vh',color:'#f8fafc',fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'30px',borderBottom:'2px solid #1e293b',paddingBottom:'20px'}}>
          <h1 style={{margin:0,color:'#fbbf24',fontSize:'28px'}}>TIB HUB <small style={{fontSize:'12px',color:'#94a3b8'}}>v11.0</small></h1>
          <button onClick={runOp} disabled={load} style={{background:'#fbbf24',color:'#0f172a',border:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>
            {load ? 'ISLENIYOR...' : '+ YENI ICRAAT EKLE'}
          </button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',marginBottom:'30px'}}>
          <div style={{background:'#1e293b',padding:'20px',borderRadius:'12px'}}>
            <small style={{color:'#94a3b8'}}>Haftalik Hacim</small>
            <div style={{fontSize:'24px',fontWeight:'bold',color:'#10b981'}}>20.5M TL</div>
          </div>
          <div style={{background:'#1e293b',padding:'20px',borderRadius:'12px'}}>
            <small style={{color:'#94a3b8'}}>Aktif Ilanlar</small>
            <div style={{fontSize:'24px',fontWeight:'bold'}}>{data.length} Adet</div>
          </div>
          <div style={{background:'#1e293b',padding:'20px',borderRadius:'12px'}}>
            <small style={{color:'#94a3b8'}}>Sistem Durumu</small>
            <div style={{fontSize:'24px',fontWeight:'bold',color:'#fbbf24'}}>ONLINE</div>
          </div>
        </div>

        <div style={{background:'#1e293b',borderRadius:'12px',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse',textAlign:'left'}}>
            <thead>
              <tr style={{background:'#334155',color:'#cbd5e1'}}>
                <th style={{padding:'15px'}}>ILAN BASLIGI</th>
                <th style={{padding:'15px'}}>MIKTAR</th>
                <th style={{padding:'15px'}}>DURUM</th>
              </tr>
            </thead>
            <tbody>
              {data.map(x=>(
                <tr key={x.id} style={{borderBottom:'1px solid #334155'}}>
                  <td style={{padding:'15px'}}>{x.title}</td>
                  <td style={{padding:'15px',color:'#fbbf24'}}>{x.amount}</td>
                  <td style={{padding:'15px'}}><span style={{background:'#064e3b',color:'#34d399',padding:'4px 8px',borderRadius:'4px',fontSize:'12px'}}>{x.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
