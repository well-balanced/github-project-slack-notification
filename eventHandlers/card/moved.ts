import { EH, CardMovedEventPayload } from 'types'
import { sendWebhook } from 'utils'

export const cardMovedEventehHandler: EH<CardMovedEventPayload> = async (
  payload,
) => {
  payload.project_card.node_id
  await sendWebhook('cardMoved')
}
