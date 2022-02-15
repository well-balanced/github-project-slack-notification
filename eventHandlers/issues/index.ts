import { UnsupportedEventException } from 'exceptions'
import { IssueAction, IssueEventPayload } from 'types'
import { issueOpenedEventehHandler } from './opened'

export function getIssueEventHandler(payload: IssueEventPayload) {
  switch (payload.action) {
    case IssueAction.Opened:
      return issueOpenedEventehHandler
    default:
      throw new UnsupportedEventException(
        `${payload?.action} is an unsupported issue event`,
      )
  }
}
