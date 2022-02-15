import { CardEventHandler } from 'types'
import { sendWebhook } from 'utils'

export const cardCreatedEventehHandler: CardEventHandler = async (payload) => {
  await sendWebhook('cardCreated')
}
