import * as dotenv from 'dotenv'
dotenv.config()

export const WEBHOOK_URL: string = process.env.WEBHOOK_URL

export const GITHUB_TOKEN: string = process.env.GITHUB_TOKEN

const users = process.env.USERS.split(',')
const names = process.env.NAMES.split(',')
export const USER_NAME_MAP = Array.from({ length: users.length }).reduce(
  (prev: any, _, idx) => ({ ...prev, [users[idx]]: names[idx] }),
  {},
)
