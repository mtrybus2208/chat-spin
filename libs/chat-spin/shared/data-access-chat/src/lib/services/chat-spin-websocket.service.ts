import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventAction, SocketMessage } from '@mtrybus/util-types';
import { BehaviorSubject, catchError, filter, of, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const WS_ENDPOINT = 'wss://n6cp5yn4nl.execute-api.us-east-2.amazonaws.com/dev/';

@Injectable({
  providedIn: 'root',
})
export class ChatWebSocketService {
  private destroyRef = inject(DestroyRef);
  private socket$: WebSocketSubject<SocketMessage> | undefined;
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  readonly connectionStatus$ = this.connectionStatusSubject.asObservable();
  private messagesSubject = new Subject<SocketMessage>();
  readonly messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.destroyRef.onDestroy(() => this.close());
  }

  readonly isConnected$ = this.messages$.pipe(
    filter(
      (message: SocketMessage) => message?.action === EventAction.CONNECTED
    )
  );

  readonly sendMessageEvent$ = this.messages$.pipe(
    filter(
      (message: SocketMessage) => message?.action === EventAction.SEND_MESSAGE
    )
  );

  readonly disconnectEvent$ = this.messages$.pipe(
    filter(
      (message: SocketMessage) => message?.action === EventAction.DISCONNECTED
    )
  );

  connect(): void {
    this.socket$ = webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('WebSocket connected!');

          this.connectionStatusSubject.next(true);

          this.sendMessage({
            action: EventAction.USER_MATCH,
          });
        },
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket connection closed!');
          this.connectionStatusSubject.next(false);
        },
      },
    });

    this.socket$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: unknown) => {
          console.error('WebSocket error: ', error);
          this.connectionStatusSubject.next(false);

          return of(null);
        }),
        filter((message: SocketMessage | null) => message != null)
      )
      .subscribe((message) => {
        console.log('Message received: ', message);
        this.messagesSubject.next(message);
      });

    this.connectionStatusSubject.next(true);
  }

  sendMessage(msg: SocketMessage): void {
    if (!this.socket$) {
      console.warn('WebSocket is not connected. Cannot send message:', msg);
      return;
    }

    this.socket$.next(msg);
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
    this.connectionStatusSubject.next(false);
  }
}
