import { Client } from '@notionhq/client'
import {
  NOTION_API_KEY,
  NOTION_CLIENT_ID,
  TASK_DATABASE_ID,
} from '../constants'

interface MarkIssueNumberArgs {
  issueNumber: number
  pageId: string
}

interface CreateTaskArgs {
  task: string
  nodeId: string
}

interface UpdateTaskStateArgs {
  pageId: string
  state: NotionTaskState
}

interface UpdateTaskArgs {
  pageId: string
  blockId: string
  title: string
  body: string
}

export type GitHubTaskState =
  | 'BackLog 👣'
  | 'To do 🎯'
  | 'In progress 🚧'
  | 'Done ✅'
  | 'Archive ⏳'

export type NotionTaskState =
  | 'Backlog'
  | 'To do'
  | 'In Progress'
  | 'Done'
  | 'Archive'

export class NotionTaskClient {
  private _notionClient = new Client({ auth: NOTION_API_KEY })
  private _clientId = NOTION_CLIENT_ID
  private _databaseId = TASK_DATABASE_ID
  private _githubNotionStateMap: Record<GitHubTaskState, NotionTaskState> = {
    'BackLog 👣': 'Backlog',
    'To do 🎯': 'To do',
    'In progress 🚧': 'In Progress',
    'Done ✅': 'Done',
    'Archive ⏳': 'Archive',
  }

  async fetchBlocks(blockId: string) {
    const { results } = await this._notionClient.blocks.children.list({
      block_id: blockId,
      page_size: 10,
    })
    return results
  }

  async retrieveByNodeId(nodeId: string) {
    const response = await this._notionClient.databases.query({
      database_id: this._databaseId,
      filter: {
        property: 'id',
        rich_text: {
          equals: nodeId,
        },
      },
    })
    const [page] = response.results
    return page
  }

  async retrieveByIssueNumber(issueNumber: number) {
    const response = await this._notionClient.databases.query({
      database_id: this._databaseId,
      filter: {
        property: '이슈 넘버',
        number: {
          equals: issueNumber,
        },
      },
    })
    const [page] = response.results
    return page
  }

  async retrieveByBlockId(blockId: string) {
    const response = await this._notionClient.databases.query({
      database_id: this._databaseId,
      filter: {
        property: 'blockId',
        rich_text: {
          equals: blockId,
        },
      },
    })
    const [page] = response.results
    return page
  }

  async updateState({ pageId, state }: UpdateTaskStateArgs) {
    return await this._notionClient.pages.update({
      page_id: pageId,
      properties: {
        상태: { select: { name: state } },
      },
    })
  }

  async markCustomBlockId(pageId: string, customBlockId: string) {
    /**
     * Mark the 'blockId' property on the page.
     */
    await this._notionClient.pages.update({
      page_id: pageId,
      properties: {
        blockId: { rich_text: [{ text: { content: customBlockId } }] },
      },
    })
  }

  async markIssueNumber({ issueNumber, pageId }: MarkIssueNumberArgs) {
    /**
     * Mark the '이슈 넘버' property on the page.
     */
    return await this._notionClient.pages.update({
      page_id: pageId,
      properties: {
        '이슈 넘버': { number: issueNumber },
      },
    })
  }

  async syncWithGitHub({ pageId, blockId, title, body }: UpdateTaskArgs) {
    const [childBlock]: any = await this.fetchBlocks(blockId)
    await this._notionClient.pages.update({
      page_id: pageId,
      properties: {
        업무: { title: [{ text: { content: title } }] },
      },
    })

    await this._notionClient.blocks.update({
      block_id: childBlock.id,
      paragraph: { text: [{ text: { content: body } }] },
    })
  }

  async create({ task, nodeId }: CreateTaskArgs) {
    return await this._notionClient.pages.create({
      parent: {
        database_id: this._databaseId,
      },
      icon: {
        type: 'emoji',
        emoji: '📄',
      },
      properties: {
        id: { rich_text: [{ text: { content: nodeId } }] },
        업무: { title: [{ text: { content: task } }] },
        상태: { select: { name: 'Backlog' } },
      },
      children: [
        {
          object: 'block',
          type: 'toggle',
          toggle: {
            text: [{ text: { content: '🐈‍⬛  GitHub 이슈 동기화' } }],
            children: [
              {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                  text: [
                    { text: { content: '아직 동기화된 내용이 없습니다 😭' } },
                  ],
                },
              },
            ],
          },
        },
      ],
    })
  }

  findCustomBlocks(blocks: any) {
    const [customBlock] = blocks.filter(
      (block) => block.created_by.id === this._clientId,
    )
    return customBlock
  }

  findNotionState(state: GitHubTaskState) {
    return this._githubNotionStateMap[state]
  }
}
