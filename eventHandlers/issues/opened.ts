import { USER_NAME_MAP } from '../../constants'
import { EH, IssueOpenedEventPayload } from 'types'
import { getIssueUrl, sendWebhook, wait } from 'utils'
import { NotionTaskClient } from 'notion'

export const issueOpenedEventHandler: EH<IssueOpenedEventPayload> = async (
  payload,
) => {
  /**
   * waiting for the card converted event
   * refer to src/eventHandlers/card/converted
   */
  await wait(3000)

  const username = USER_NAME_MAP[payload.sender.login]
  const { title, body, number: issueNumber } = payload.issue
  const issueUrl = getIssueUrl(issueNumber)

  /**
   * Send to slack
   */
  const message = ` *[${username}]* 님이 *[${title}]* 이슈를 열었습니다. \n\n<${issueUrl}|*이슈 바로 보러가기*>`
  await sendWebhook(message)

  /**
   * Synchronize with GitHub
   */
  const notionTaskClient = new NotionTaskClient()
  const page: any = await notionTaskClient.retrieveByIssueNumber(issueNumber)
  const [textProperty] = page.properties.blockId.rich_text
  const blockId = textProperty.text.content

  await notionTaskClient.syncWithGitHub({
    pageId: page.id,
    blockId,
    title,
    body,
  })
}
