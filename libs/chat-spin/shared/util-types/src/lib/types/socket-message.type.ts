import { EventAction } from '../enums';

export type WebSocketMessageAttachment = {
  objectKey: string;
};

export type MessageData = {
  message: string;
  attachments: WebSocketMessageAttachment[];
  to?: string;
  from?: string;
  roomId?: string;
  connectionId?: string;
};

export type SocketMessage<T = MessageData> = {
  action: EventAction;
  data?: T;
};

export type ConnectionData = {
  connectionId: string;
};
