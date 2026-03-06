'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function TIB_V11(){
  const [data,setData]=useState([]);
  const [load,setLoad]=useState(false);
  
  const refresh=async()=>{
    const {data:res}=await sb.from('trades').select('*').order('created_at',{ascending:false});
    if(res) setData(res);
  };

  useEffect(()=>{refresh();},[]);

  const add=async()=>{
    setLoad(true);
    const {error}=await sb.from('trades').insert([{title:'v11.0 CANLI ICRAAT',amount:'25.5M TL',status:'AKTIF'}]);
    if(!error){ alert('MÜHÜR BASILDI!'); refresh(); }
    else { alert('Hata: ' + error.message); }
    setLoad(false);
  };

  return(
    <div style={{padding:'40px',background:'#0f172a',minHeight:'100vh',color:'#f8fafc',fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #1e293b',paddingBottom:'20px',marginBottom:'30px'}}>
          <h1 style={{margin:0,color:'#fbbf24'}}>TIB HUB <small style={{fontSize:'12px'}}>v11.0</small></h1>
          <button onClick={add} disabled={load} style={{background:'#fbbf24',color:'#0f172a',border:'none',padding:'12px 24px',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>
            {load ? 'ISLENIYOR...' : '+ YENİ İCRAAT EKLE'}
          </button>
        </div>
        <div style={{background:'#1e293b',borderRadius:'12px',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse',textAlign:'left'}}>
            <thead>
              <tr style={{background:'#334155'}}>
                <th style={{padding:'15px'}}>BAŞLIK</th>
                <th style={{padding:'15px'}}>MİKTAR</th>
                <th style={{padding:'15px'}}>DURUM</th>
              </tr>
            </thead>
            <tbody>
              {data.map(x=>(
                <tr key={x.id} style={{borderBottom:'1px solid #334155'}}>
                  <td style={{padding:'15px'}}>{x.title}</td>
                  <td style={{padding:'15px',color:'#fbbf24'}}>{x.amount}</td>
                  <td style={{padding:'15px'}}>{x.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
