'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function D(){
const [t,setT]=useState([]);
const get=async()=>{const {data}=await sb.from('trades').select('*');if(data)setT(data);};
useEffect(()=>{get();},[]);
return(<div style={{padding:'40px',textAlign:'center'}}><h1 style={{color:'#1B365D'}}>TIB DASHBOARD v8.0</h1><button onClick={async()=>{await sb.from('trades').insert([{title:'YENI ICRAAT',amount:'500.000 TL',status:'OK'}]);get();}} style={{padding:'15px',background:'#1B365D',color:'#D4AF37',fontWeight:'bold',borderRadius:'10px'}}>+ HIZLI ILAN EKLE</button><hr/><div style={{marginTop:'20px'}}>{t.map(x=><div key={x.id} style={{borderBottom:'1px solid #eee',padding:'10px'}}><b>{x.title}</b> - {x.amount}</div>)}</div></div>);}