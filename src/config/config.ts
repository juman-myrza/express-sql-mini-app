import { config } from 'dotenv'
config()

export const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SECRET_KEY,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET,
} = process.env
