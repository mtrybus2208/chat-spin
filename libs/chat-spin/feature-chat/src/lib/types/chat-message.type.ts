import { WebSocketMessageAttachment } from '@mtrybus/util-types';

export type ChatMessage = {
  text: string;
  createdAt: number;
  isHost: boolean;
  user: any;
  attachments?: WebSocketMessageAttachment[];
};
