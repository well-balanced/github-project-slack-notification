import { USER_NAME_MAP } from '../../constants'
import { EH, NewCardEventPayload } from 'types'
import { sendWebhook } from 'utils'
import { NotionTaskClient } from 'notion'

export const cardCreatedEventHandler: EH<NewCardEventPayload> = async (
  payload,
) => {
  /**
   * Send slack message
   */
  const username = USER_NAME_MAP[payload.sender.login] || '알 수 없음'
  const [task] = payload.project_card.note.split('\n')
  const message = ` *[${username}]* 님이 *[${task}]* 카드를 추가하셨습니다. \n\n<https://github.com/orgs/sixshop/projects/1|*칸반 보러가기*>`
  await sendWebhook(message)

  /**
   * Create a notion page
   */
  const notionTaskClient = new NotionTaskClient()
  const { id: pageId } = await notionTaskClient.create({
    task,
    nodeId: payload.project_card.node_id,
  })

  const blocks: any = await notionTaskClient.fetchBlocks(pageId)
  const customBlock = notionTaskClient.findCustomBlocks(blocks)

  if (!customBlock) {
    return
  }

  await notionTaskClient.markCustomBlockId(pageId, customBlock.id)
}
