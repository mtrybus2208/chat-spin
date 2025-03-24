import { EventAction } from '../enums';

export type SocketMessage = {
  action: EventAction;
  data: unknown;
};
