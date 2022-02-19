import { UnsupportedEventException } from 'exceptions'
import { CardAction, CardEventPayload } from 'types'
import { cardCreatedEventHandler } from './created'
import { cardMovedEventHandler } from './moved'

export function getCardEventHandler(payload: CardEventPayload) {
  switch (payload.action) {
    case CardAction.Created:
      return cardCreatedEventHandler
    case CardAction.Moved:
      return cardMovedEventHandler
    default:
      throw new UnsupportedEventException(
        `${payload?.action} is an unsupported card event`,
      )
  }
}
