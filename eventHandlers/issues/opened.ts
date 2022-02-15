import { EH, IssueOpenedEventPayload } from 'types'
import { sendWebhook } from 'utils'

export const issueOpenedEventehHandler: EH<IssueOpenedEventPayload> = async (
  payload,
) => {
  await sendWebhook('issueOpened')
}
