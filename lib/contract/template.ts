export const contractHeader = (contractNo: string, date: string) => `
------------------------------------------------------------
TİB AĞI TİCARİ İŞBİRLİĞİ VE ARACILIK PROTOKOLÜ
Sözleşme No: ${contractNo} | Tarih: ${date}
------------------------------------------------------------
`;

export const contractBody = (buyer: string, seller: string, product: string, commission: string) => `
1. TARAFLAR: 
ALICI: ${buyer}
SATICI: ${seller}

2. KONU: 
İşbu protokol, ${product} emtiasının alım-satım sürecine TİB Ağı aracılığıyla 
gerçekleşen eşleşmeyi ve komisyon hakedişlerini düzenler.

3. YASAL DAYANAK: 
Bu belge, 6098 Sayılı Türk Borçlar Kanunu ve 28.02.2026 tarihli 
KVKK İlke Kararı uyarınca dijital ortamda OTP doğrulama ile onaylanmıştır.

4. HÜKÜMLER: 
Sistem üzerinden verilen 'Teslim Aldım ve Onaylıyorum' onayı, 
malın ayıpsız teslim alındığının kesin beyanıdır.
Hakediş tutarı: ${commission} 
`;
