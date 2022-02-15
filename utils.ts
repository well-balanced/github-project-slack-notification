import axios from 'axios'
import { WEBHOOK_URL } from './constants'

export async function sendWebhook(message: string): Promise<void> {
  await axios.post(WEBHOOK_URL, {
    text: message,
  })
}
