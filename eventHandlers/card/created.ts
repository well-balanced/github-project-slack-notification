import { EH, NewCardEventPayload } from 'types'
import { sendWebhook } from 'utils'

export const cardCreatedEventehHandler: EH<NewCardEventPayload> = async (
  payload,
) => {
  await sendWebhook('cardCreated')
}
