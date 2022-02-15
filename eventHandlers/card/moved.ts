import { USER_NAME_MAP } from '../../constants'
import { EH, CardMovedEventPayload } from 'types'
import { callGithubApi, sendWebhook } from 'utils'
import { Column, Issue } from 'types'

export const cardMovedEventpehHandler: EH<CardMovedEventPayload> = async (
  payload,
) => {
  const username = payload.sender.login
  const name = USER_NAME_MAP[username]
  let title = payload.project_card.note
  if (!title) {
    const { data } = await callGithubApi<Issue>({
      url: payload.project_card.content_url,
    })
    title = data.title
  }

  const prevColumnId = payload.changes.column_id.from.toString()
  const [currentColumnId, ...rest] = payload.project_card.column_url
    .split('/')
    .reverse()
  const columnUrl = rest.reverse().join('/')
  const [{ data: prevColumn }, { data: currentColumn }] = await Promise.all([
    callGithubApi<Column>({ url: `${columnUrl}/${prevColumnId}` }),
    callGithubApi<Column>({ url: `${columnUrl}/${currentColumnId}` }),
  ])

  const messageFormat = ` *[${name}]* 님이 *[${title}]* 카드를 *[${prevColumn.name}]* ➡️ *[${currentColumn.name}]* 로 옮기셨습니다. \n\n<https://github.com/orgs/sixshop/projects/1|*칸반 보러가기*>`
  if (prevColumnId !== currentColumnId) {
    await sendWebhook(messageFormat)
  }
}
