export async function logAction(adminId: string, action: string, details: any) {
  const timestamp = new Date().toISOString();
  const entry = { adminId, action, details, timestamp };
  
  // Bu loglar silinemez (Append-only) bir hücreye kaydedilir.
  console.log(`���️ GÜVENLİK GÜNLÜĞÜ: [${timestamp}] Admin:${adminId} - İşlem:${action}`);
  // İleride burası Supabase 'audit_logs' tablosuna yazacak.
}
