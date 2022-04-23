import * as dotenv from 'dotenv'
dotenv.config()

export const WEBHOOK_URL = process.env.WEBHOOK_URL
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN

/**
 * e.g.
 * users = well-balanced,iam-woosik.kim
 *  names = Woody Kim,Woosik Kim
 * USER_NAME_MAP = { 'well-balanced': 'Woody Kim', 'iam-woosik-kim': 'Woosik Kim' }
 */
const users = process.env.USERS.split(',') || []
const names = process.env.NAMES.split(',') || []
export const USER_NAME_MAP = Array.from({
  length: users.length,
}).reduce(
  (prev: any, _, idx) => ({ ...prev, [users[idx]]: names[idx] }),
  {},
) as Record<string, string>

export const TASK_DATABASE_ID = '1b122a1d3b934f3c9ac260a5fa0da684'
export const NOTION_API_KEY = process.env.NOTION_API_KEY
export const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID
