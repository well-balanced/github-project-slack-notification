import axios, { AxiosResponse, Method } from 'axios'
import { GITHUB_TOKEN, WEBHOOK_URL } from '../constants'

export async function sendWebhook(
  message: string | Record<string, any>,
): Promise<void> {
  if (!WEBHOOK_URL) throw new Error('webhook url is not speicified')
  await axios.post(WEBHOOK_URL, {
    text: message,
  })
}

interface CallGithubAPIArgs<T> {
  url: string
  data?: T
  method?: Method
  params?: any
}

export async function callGithubApi<T = any>({
  url,
  method = 'GET',
  data,
  params,
}: CallGithubAPIArgs<T>): Promise<AxiosResponse<T, any>> {
  return await axios.request<T>({
    url,
    params,
    data,
    method,
    ...(GITHUB_TOKEN && {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }),
  })
}
