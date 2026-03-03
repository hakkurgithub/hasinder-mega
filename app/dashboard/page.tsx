'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function D(){
const [t,setT]=useState([]);
const get=async()=>{const {data}=await sb.from('trades').select('*').order('created_at',{ascending:false});if(data)setT(data);};
useEffect(()=>{get();},[]);
return(<div style={{padding:'50px',textAlign:'center',fontFamily:'sans-serif'}}>
<h1 style={{color:'#1B365D'}}>TIB HUB v9.0</h1>
<p>Icraat Merkezi Aktif.</p>
<button onClick={async()=>{await sb.from('trades').insert([{title:'YENI ISLEM',amount:'1.250.000 TL',status:'OK'}]);get();}} style={{padding:'20px',background:'#1B365D',color:'#D4AF37',fontWeight:'bold',borderRadius:'15px',cursor:'pointer'}}>+ HIZLI ISLEM EKLE</button>
<hr style={{margin:'30px 0'}}/>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{t.map(x=><div key={x.id} style={{background:'#fff',padding:'15px',borderRadius:'10px',boxShadow:'0 2px 5px rgba(0,0,0,0.1)'}}><b>{x.title}</b> - {x.amount}</div>)}
</div>
</div>);}