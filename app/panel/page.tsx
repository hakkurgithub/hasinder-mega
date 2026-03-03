'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const S_URL='https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(S_URL,S_KEY);

export default function P(){
const [t,setT]=useState([]);
const get=async()=>{const {data}=await sb.from('trades').select('*');if(data)setT(data);};
useEffect(()=>{get();},[]);
const add=async()=>{await sb.from('trades').insert([{title:'ICRAAT TESTI',amount:'1.000 TL',status:'OK'}]);get();};
return(<div style={{padding:'50px',textAlign:'center'}}>
<h1 style={{color:'#1B365D'}}>TIB AG ICRAAT MERKEZI v7.1</h1>
<button onClick={add} style={{padding:'20px',background:'#1B365D',color:'#D4AF37',fontWeight:'bold',borderRadius:'15px'}}>ILAN EKLE VE TEST ET</button>
<div style={{marginTop:'30px'}}>{t.map(x=><div key={x.id}>{x.title} - {x.amount}</div>)}</div>
</div>);}