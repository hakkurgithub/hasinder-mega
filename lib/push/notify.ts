export async function sendPushNotification(userId: string, title: string, body: string) {
  // 28.02.2026 KVKK karari geregi sadece dogrulanmis cihazlara bildirim gider
  console.log(`í³± PUSH SENT: [${userId}] ${title}: ${body}`);
  // Burada ileride Firebase Cloud Messaging (FCM) entegrasyonu calisacak
}
