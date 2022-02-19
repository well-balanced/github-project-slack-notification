import { USER_NAME_MAP } from '../../constants'
import { EH, NewCardEventPayload } from 'types'
import { sendWebhook } from 'utils'

export const cardCreatedEventHandler: EH<NewCardEventPayload> = async (
  payload,
) => {
  const username = payload.sender.login
  const name = USER_NAME_MAP[username] || '알 수 없음'
  const task = payload.project_card.note
  const message = ` *[${name}]* 님이 *[${task}]* 카드를 추가하셨습니다. \n\n<https://github.com/orgs/sixshop/projects/1|*칸반 보러가기*>`
  await sendWebhook(message)
}
