import { defineConfig, type Config } from "drizzle-kit";
import * as dotenv from "dotenv"

dotenv.config({
  path: ".env"
})

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["geoknight2_*"],
  strict: true,
}) satisfies Config;
