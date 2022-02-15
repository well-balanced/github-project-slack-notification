import { UnsupportedEventException } from 'exceptions'
import { CardAction, CardEventHandler, CardEventPayload } from 'types'
import { cardCreatedEventehHandler } from './created'
import { cardMovedEventehHandler } from './moved'

export function getCardEventHandler(
  payload: CardEventPayload,
): CardEventHandler {
  switch (payload.action) {
    case CardAction.Created:
      return cardCreatedEventehHandler
    case CardAction.Moved:
      return cardMovedEventehHandler
    default:
      throw new UnsupportedEventException(
        `${payload?.action} is an unsupported card event`,
      )
  }
}
