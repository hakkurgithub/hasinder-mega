'use client';
import React,{useState,useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';

const URL=process.env.NEXT_PUBLIC_SUPABASE_URL||'https://scxwhchnuhsuzkfvqmqw.supabase.co';
const KEY=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const sb=createClient(URL,KEY);

export default function Panel(){
const [t,setT]=useState([]);
const [l,setL]=useState(true);
const [m,setM]=useState(false);
const [f,setF]=useState({title:'',amount:'',cat:'GIDA'});

const get=async()=>{setL(true);const {data}=await sb.from('trades').select('*').order('created_at',{ascending:false});if(data)setT(data);setL(false);};
useEffect(()=>{get();},[]);

const add=async(e)=>{e.preventDefault();const {error}=await sb.from('trades').insert([{...f,status:'ACTIVE'}]);if(!error){setF({title:'',amount:'',cat:'GIDA'});setM(false);get();}};

return(
<div className="min-h-screen bg-gray-100 p-4 font-sans text-blue-900">
<div className="max-w-6xl mx-auto space-y-4">
<div className="bg-blue-900 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg border-b-4 border-yellow-500">
<div><h1 className="text-xl font-bold italic">TIB HUB V6.4</h1><p className="text-xs opacity-50">Operational Center</p></div>
<button onClick={()=>setM(true)} className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-xl font-black shadow-md hover:scale-105 transition-all">+ NEW TRADE</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-blue-500"><p className="text-xs text-gray-400">TOTAL ADS</p><h2 className="text-xl font-bold">{t.length}</h2></div>
<div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-green-500"><p className="text-xs text-gray-400">MATCHES</p><h2 className="text-xl font-bold">12</h2></div>
<div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-yellow-500"><p className="text-xs text-gray-400">PROFIT</p><h2 className="text-xl font-bold">453k TL</h2></div>
</div>
<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
<div className="p-4 border-b font-bold uppercase text-xs">Market Activity</div>
<div className="p-2 overflow-x-auto">
{l ? <p className="text-center py-10">Loading...</p> : 
<table className="w-full text-left text-sm">
<thead className="text-gray-400 uppercase text-xs"><tr><th className="p-2">Cat</th><th>Title</th><th>Volume</th><th>Status</th></tr></thead>
<tbody className="divide-y">{t.map((x)=>(<tr key={x.id} className="font-bold border-b"><td className="p-2 text-blue-600">{x.cat||'GIDA'}</td><td className="uppercase">{x.title}</td><td className="text-green-600">{x.amount}</td><td><span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full uppercase">{x.status}</span></td></tr>))}</tbody>
</table>}
</div>
</div>
</div>
{m && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
<div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl border-t-8 border-yellow-500">
<h2 className="text-lg font-bold mb-4">NEW TRADE</h2>
<form onSubmit={add} className="space-y-3">
<input placeholder="Title" className="w-full p-3 bg-gray-50 rounded-xl" value={f.title} onChange={(e)=>setF({...f,title:e.target.value})} required />
<input placeholder="Amount" className="w-full p-3 bg-gray-50 rounded-xl" value={f.amount} onChange={(e)=>setF({...f,amount:e.target.value})} required />
<div className="flex justify-end gap-2 pt-4">
<button type="button" onClick={()=>setM(false)} className="text-gray-400 font-bold px-4">CANCEL</button>
<button type="submit" className="bg-blue-900 text-yellow-500 px-6 py-2 rounded-xl font-bold">PUBLISH</button>
</div>
</form>
</div>
</div>}
</div>);
}
