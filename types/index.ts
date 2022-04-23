export enum CardAction {
  Created = 'created',
  Edited = 'edited',
  Moved = 'moved',
  Converted = 'converted',
}

export enum IssueAction {
  Opened = 'opened',
  Edited = 'edited',
  Deleted = 'deleted',
  Closed = 'closed',
  Assigned = 'assigned',
}

export interface ProjectCard {
  url: string
  project_url: string
  column_url: string
  column_id: number
  id: number
  node_id: string
  note: string
  archived: boolean
  creator: User
  content_url?: string
}

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  url: string
  type: 'User'
}

export interface Column {
  url: string
  project_url: string
  card_url: string
  id: number
  node_id: string
  name: string
}

export interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  id: number
  node_id: string
  title: string
  user: User
  labels: string[]
  state: 'open' | 'close'
  assignee: string | null
  assignees: string[]
  milestone: string | null
  comments: number
  body: string
  number: number
}

export interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  issue_events_url: string
  hooks_url: string
}

export type EventPayloads =
  | NewCardEventPayload
  | CardEditedEventPayload
  | CardMovedEventPayload
  | CardConvertedEventPayload
  | IssueOpenedEventPayload
  | IssueEditedEventPayload

export interface BaseEventPayload {
  action: IssueAction | CardAction
  sender: User
  repository: Repository
}

export interface IssueEventPayload extends BaseEventPayload {
  action: IssueAction
  issue: Issue
}

export interface CardEventPayload extends BaseEventPayload {
  action: CardAction
  project_card: ProjectCard
}

export interface NewCardEventPayload extends CardEventPayload {
  action: CardAction.Created
}

export interface CardEditedEventPayload extends CardEventPayload {
  action: CardAction.Edited
  changes: { from: string }
}

export interface CardMovedEventPayload extends CardEventPayload {
  action: CardAction.Moved
  changes: { column_id: { from: number } }
}

export interface CardConvertedEventPayload extends CardEventPayload {
  action: CardAction.Converted
  changes: { note: { from: string } }
}

export interface IssueOpenedEventPayload extends IssueEventPayload {
  action: IssueAction.Opened
  issue: Issue
}

export interface IssueEditedEventPayload extends IssueEventPayload {
  action: IssueAction.Edited
  issue: Issue
}

export type EH<T extends BaseEventPayload> = (payload: T) => Promise<void>
