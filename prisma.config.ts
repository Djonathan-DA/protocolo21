// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // ⚠️ MUDANÇA AQUI: Apontando para a DIRECT_URL (porta 5432)
    // Isso permite que o Prisma modifique a estrutura do banco sem ser bloqueado pelo Pooler
    url: env("DIRECT_URL"),
  },
});