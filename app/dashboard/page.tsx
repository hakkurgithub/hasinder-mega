'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function TIB_V11(){
  const [data,setData] = useState<any[]>([]);
  
  const refresh = async () => {
    const {data:res} = await sb.from('trades').select('*').order('created_at',{ascending:false});
    if(res) setData(res);
  };

  useEffect(() => {
    refresh();
  }, []);

  return(
    <div style={{padding:'40px',background:'#0f172a',minHeight:'100vh',color:'#f8fafc',fontFamily:'sans-serif',textAlign:'center'}}>
      <h1 style={{color:'#fbbf24'}}>TIB HUB v11.0 - CANLI</h1>
      <div style={{maxWidth:'800px',margin:'40px auto',background:'#1e293b',padding:'20px',borderRadius:'15px'}}>
        {data.length > 0 ? data.map(x=>(
          <div key={x.id} style={{padding:'15px',borderBottom:'1px solid #334155',display:'flex',justifyContent:'space-between'}}>
            <span>{x.title}</span>
            <span style={{color:'#fbbf24'}}>{x.amount}</span>
          </div>
        )) : <p>Veriler yukleniyor...</p>}
      </div>
    </div>
  );
}
