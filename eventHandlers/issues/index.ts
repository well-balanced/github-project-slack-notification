import { UnsupportedEventException } from 'exceptions'
import { IssueAction, IssueEventPayload } from 'types'
import { issueOpenedEventHandler } from './opened'
import { issueEditedEventHandler } from './edited'

export function getIssueEventHandler(payload: IssueEventPayload) {
  switch (payload.action) {
    case IssueAction.Opened:
      return issueOpenedEventHandler
    case IssueAction.Edited:
      return issueEditedEventHandler
    default:
      throw new UnsupportedEventException(
        `${payload?.action} is an unsupported issue event`,
      )
  }
}
