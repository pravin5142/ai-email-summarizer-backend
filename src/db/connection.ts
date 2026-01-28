// import { drizzle } from "drizzle-orm/node-postgres";
// import pkg from "pg";
// import * as schema from "./schema.js";

// const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// export const db = drizzle(pool, { schema });


import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';

dotenv.config();

neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env file!");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
