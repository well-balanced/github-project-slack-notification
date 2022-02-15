import { CardEventHandler } from 'types'
import { sendWebhook } from 'utils'

export const cardMovedEventehHandler: CardEventHandler = async (payload) => {
  await sendWebhook('cardMoved')
}
