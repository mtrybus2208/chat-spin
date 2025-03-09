export enum MessageType {
  CHAT = 'chat',
  SYSTEM = 'system',
  STATUS = 'status',
  CONNECTION = 'connection',
}

export interface BaseMessage {
  timestamp: number;
  type: MessageType;
}

export interface ChatMessage extends BaseMessage {
  id?: string;
  text: string;
  userId: string;
  userName: string;
  type: MessageType.CHAT;
}

export interface SystemMessage extends BaseMessage {
  id?: string;
  text: string;
  type: MessageType.SYSTEM;
}

export interface UserStatusMessage extends BaseMessage {
  userId: string;
  userName: string;
  status: 'online' | 'offline' | 'typing';
  type: MessageType.STATUS;
}

export interface ConnectionMessage extends BaseMessage {
  userId: string;
  userName: string;
  connectionId?: string;
  type: MessageType.CONNECTION;
}

export type WebSocketMessage =
  | ChatMessage
  | SystemMessage
  | UserStatusMessage
  | ConnectionMessage;

export interface WebSocketRequest {
  action: string;
  payload: any;
}
