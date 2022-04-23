import { NotionTaskClient } from 'notion'
import { CardConvertedEventPayload, EH } from 'types'

export const cardConvertedEventHandler: EH<CardConvertedEventPayload> = async (
  payload,
) => {
  const nodeId = payload.project_card.node_id
  const [issueNumber] = payload.project_card.content_url.split('/').reverse()
  const parsed = parseInt(issueNumber, 10)

  const notionTaskClient = new NotionTaskClient()
  const page = await notionTaskClient.retrieveByNodeId(nodeId)

  await notionTaskClient.markIssueNumber({
    issueNumber: parsed,
    pageId: page.id,
  })
}
