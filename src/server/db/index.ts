import { neon } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
const db: NeonHttpDatabase = drizzle(sql);

export default db;
