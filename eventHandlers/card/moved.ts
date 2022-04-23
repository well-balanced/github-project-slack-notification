import { USER_NAME_MAP } from '../../constants'
import { EH, CardMovedEventPayload } from 'types'
import { callGithubApi, sendWebhook } from 'utils'
import { Column, Issue } from 'types'
import { GitHubTaskState, NotionTaskClient } from 'notion'

export const cardMovedEventHandler: EH<CardMovedEventPayload> = async (
  payload,
) => {
  const username = USER_NAME_MAP[payload.sender.login] || '알 수 없음'
  const { project_card: projectCard } = payload
  let title = projectCard.note

  if (!title) {
    const { data } = await callGithubApi<Issue>({
      url: projectCard.content_url,
    })
    title = data.title
  }

  const prevColumnId = payload.changes.column_id.from.toString()
  const [currentColumnId, ...rest] = projectCard.column_url.split('/').reverse()

  if (prevColumnId === currentColumnId) {
    return
  }

  /**
   * Send to slack
   */
  const columnUrl = rest.reverse().join('/')
  const [{ data: prevColumn }, { data: currentColumn }] = await Promise.all([
    callGithubApi<Column>({ url: `${columnUrl}/${prevColumnId}` }),
    callGithubApi<Column>({ url: `${columnUrl}/${currentColumnId}` }),
  ])

  const message = ` *[${username}]* 님이 *[${title}]* 카드를 *[${prevColumn.name}]* ➡️ *[${currentColumn.name}]* 로 옮기셨습니다. \n\n<https://github.com/orgs/sixshop/projects/1|*칸반 보러가기*>`
  await sendWebhook(message)

  /**
   * Reflect in the notion
   */
  const notionTaskClient = new NotionTaskClient()
  const state = notionTaskClient.findNotionState(
    currentColumn.name as GitHubTaskState,
  )
  const page = await notionTaskClient.retrieveByNodeId(projectCard.node_id)
  await notionTaskClient.updateState({ state, pageId: page.id })
}
