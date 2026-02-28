const fs = require('fs');
const path = require('path');

const authPath = path.join('app', 'panel', 'page.tsx');
if (fs.existsSync(authPath)) {
    let content = fs.readFileSync(authPath, 'utf8');
    const legalCheckbox = `
        <div className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg border border-red-100 mt-4">
          <input type="checkbox" required className="mt-1" />
          <p className="text-[10px] text-red-800">
            28.02.2026 KVKK İlke Kararı uyarınca; SMS doğrulama (2FA) kullanılmasını, verilerimin şifreli saklanmasını ve işlem kayıtlarımın hukuki delil sayılmasını kabul ediyorum.
          </p>
        </div>`;
    
    if (!content.includes('KVKK İlke Kararı')) {
      content = content.replace('</button>', '</button>' + legalCheckbox);
      fs.writeFileSync(authPath, content, 'utf8');
    }
}
