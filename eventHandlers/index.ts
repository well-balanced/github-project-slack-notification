import { UnsupportedEventException } from 'exceptions'
import { EventPayloads, EH } from 'types'
import { isCardEvent, isIssueEvent } from 'validations'
import { getCardEventHandler } from './card'
import { getIssueEventHandler } from './issues'

export function getEventHandler(payload: EventPayloads): EH<EventPayloads> {
  if (isCardEvent(payload)) {
    return getCardEventHandler(payload)
  }

  if (isIssueEvent(payload)) {
    return getIssueEventHandler(payload)
  }

  throw new UnsupportedEventException(`an unsupported event`)
}
