import { BaseEventPayload, CardEventPayload, IssueEventPayload } from 'types'

export function isIssueEvent(
  payload: BaseEventPayload,
): payload is IssueEventPayload {
  return 'issue' in payload ? true : false
}

export function isCardEvent(
  payload: BaseEventPayload,
): payload is CardEventPayload {
  return 'project_card' in payload ? true : false
}

export function isValidGithubPayload(
  payload: any,
): payload is BaseEventPayload {
  /**
   * reference
   * https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#webhook-payload-object-common-properties
   */
  const COMMON_PROPERTIES = ['action', 'sender', 'organization']
  const properties = Object.keys(payload)
  return COMMON_PROPERTIES.every((p) => properties.includes(p))
}
