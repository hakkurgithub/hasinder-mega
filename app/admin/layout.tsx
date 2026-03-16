import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    
    if (!payload.isAdmin) {
      redirect('/');
    }
    
    return payload;
  } catch (error) {
    redirect('/admin/login');
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifyAdmin();

  return (
    <div className="min-h-screen bg-[#0b1220] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader user={user} />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
