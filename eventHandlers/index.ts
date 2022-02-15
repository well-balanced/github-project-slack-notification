import { UnsupportedEventException } from 'exceptions'
import { BaseEventPayload, EventHandler } from 'types'
import { isCardEvent, isIssueEvent } from 'validations'
import { getCardEventHandler } from './card'
import { getIssueEventHandler } from './issues'

export function getEventHandler(payload: BaseEventPayload): EventHandler {
  if (isCardEvent(payload)) {
    return getCardEventHandler(payload)
  }

  if (isIssueEvent(payload)) {
    return getIssueEventHandler(payload)
  }

  throw new UnsupportedEventException(`an unsupported event`)
}
