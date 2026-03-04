#!/bin/bash

echo "��� Prisma schema temizleniyor..."

cat <<'EOT' > prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(uuid())
  name      String
  taxNo     String
  sector    String
  role      String
  email     String    @unique
  password  String
  balance   Float     @default(0)
  isAdmin   Boolean   @default(false)
  status    String
  tier      String
  createdAt DateTime  @default(now())
  AdminLogs AdminLog[]
}

model AdminLog {
  id        String   @id @default(cuid())
  action    String
  details   String?
  createdAt DateTime @default(now())
  adminId   String
  Admin     User     @relation(fields: [adminId], references: [id])
}
EOT

echo "✅ schema.prisma dosyası temizlendi ve doğru hale getirildi."
echo "Şimdi aşağıdaki komutları çalıştır:"
echo "npx prisma generate"
echo "npx prisma migrate dev --name fix_adminlog"

