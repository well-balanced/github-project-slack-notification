import { IssueEventHandler } from 'types'
import { sendWebhook } from 'utils'

export const issueOpenedEventehHandler: IssueEventHandler = async (payload) => {
  await sendWebhook('issueOpened')
}
