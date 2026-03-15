'use client';
import { Shield, Bell } from 'lucide-react';
import { JWTPayload } from 'jose';

interface AdminHeaderProps { user: JWTPayload & { name?: string; email?: string } }

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-[#1B365D]/50 border-b border-[#D4AF37]/20 flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <Shield className="text-[#D4AF37]" size={24} />
        <span className="text-[#D4AF37] font-semibold">Admin Kontrol Paneli</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-[#D4AF37]">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">0</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1B365D] font-bold">
            {user.name?.charAt(0) || user.email?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">{user.name || 'Admin'}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
