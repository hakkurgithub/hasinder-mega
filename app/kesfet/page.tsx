'use client';
import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart3, ClipboardList } from 'lucide-react';

export default function ExplorePanel() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await fetch('/api/trades');
        const data = await response.json();
        setTrades(data);
      } catch (error) {
        console.error('Trades yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrades();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Firma Kesfet</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              TIB Agi'nda kayitli is ortaklari ve ticaret firmalari inceleyin
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#1B365D] mb-2">{trades.length}</div>
            <div className="text-gray-600">Aktif Ticari Faaliyet</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#D4AF37] mb-2">{trades.filter(t => t.status === 'AKTIF').length}</div>
            <div className="text-gray-600">Guncel Ilanlar</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Otonom Sistem Aktif</div>
          </div>
        </div>

        {/* Trades Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Yükleniyor...</p>
          </div>
        ) : trades.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ticari faaliyet bulunamadi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trades.map((trade) => (
              <div key={trade.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{trade.title}</h3>
                      <p className="text-sm text-gray-500">{trade.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      trade.status === 'AKTIF' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {trade.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-box-3-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                      Miktar: {trade.amount}
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#1B365D] text-white px-4 py-2 rounded-lg hover:bg-[#2C5F7D] font-medium transition-colors">
                    Detaylari Gor
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
