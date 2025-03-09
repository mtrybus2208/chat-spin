import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketMessage } from '../models/chat-message.types';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  sendMessage(msg: any) {
    this.socket$?.next(msg);
  }

  close() {
    this.socket$?.complete();
  }
}
