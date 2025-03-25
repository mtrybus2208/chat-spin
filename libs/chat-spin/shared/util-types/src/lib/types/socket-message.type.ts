import { EventAction } from '../enums';

export type SocketMessage<T = Record<string, string>> = {
  action: EventAction;
  data?: T;
};

export type ConnectionData = {
  connectionId: string;
};
