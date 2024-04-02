import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) throw "no DATABASE_URL env";

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
  tablesFilter: ["authme"],
} satisfies Config;
