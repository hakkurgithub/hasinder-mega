import { prisma } from '@/lib/prisma';

export async function getServerSideProps() {
  const logs = await prisma.adminLog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { Admin: true },
  });
  return { props: { logs } };
}

export default function LogsPage({ logs }) {
  return (
    <div>
      <h1>Admin Logları</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.action}</strong> - {log.details} 
            <em> ({log.createdAt}) by {log.Admin.email}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
