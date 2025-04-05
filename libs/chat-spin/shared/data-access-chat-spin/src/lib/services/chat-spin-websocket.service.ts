import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class ChatWebSocketService {
  private readonly WS_ENDPOINT =
    'wss://n6cp5yn4nl.execute-api.us-east-2.amazonaws.com/dev/';
  private socket$: WebSocketSubject<any> | undefined;

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket(this.WS_ENDPOINT);
  }

  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
    }
  }

  sendMessage(msg: any): void {
    this.socket$?.next(msg);
  }

  close(): void {
    this.socket$?.complete();
  }
}
