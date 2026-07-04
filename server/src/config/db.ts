import { Pool } from "pg";
import { ENV } from "./env.js";

const pool = new Pool({
  user: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
});

export default pool;
