import axios, { AxiosResponse, Method } from 'axios'
import { GITHUB_TOKEN, WEBHOOK_URL } from '../constants'

export async function sendWebhook(
  message: string | Record<string, any>,
): Promise<void> {
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
  const response = await axios.request<T>({
    url,
    params,
    data,
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  })
  return response
}
