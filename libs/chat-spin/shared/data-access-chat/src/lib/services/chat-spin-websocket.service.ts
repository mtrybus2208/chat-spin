import { DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Subject, of, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface SocketMessage {
  action: string;
  data: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ChatWebSocketService implements OnDestroy {
  private destroyRef = inject(DestroyRef);

  private readonly WS_ENDPOINT =
    'wss://n6cp5yn4nl.execute-api.us-east-2.amazonaws.com/dev/';

  private socket$: WebSocketSubject<SocketMessage> | undefined;

  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  /**
   * Establishes a connection with WebSocket if there is no active or closed connection.
   */
  connect(): void {
    // If socket doesn't exist or is closed, we open a new one

    this.socket$ = webSocket({
      url: this.WS_ENDPOINT,
      openObserver: {
        next: (data) => {
          console.log('WebSocket connected!');

          this.connectionStatusSubject.next(true);

          this.sendMessage({
            action: 'userMatch',
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

    // Subscribe to the stream to react to incoming messages
    this.socket$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: any) => {
          console.error('WebSocket error: ', error);
          this.connectionStatusSubject.next(false);
          return of(null);
        })
      )
      .subscribe((message) => {
        console.log('Message received: ', message);
        this.messagesSubject.next(message);
      });

    this.connectionStatusSubject.next(true);
  }

  /**
   * Sends a message to the server via WebSocket (if the connection is active).
   */
  sendMessage(msg: any): void {
    if (this.socket$) {
      this.socket$.next(msg);
    } else {
      console.warn('WebSocket is not connected. Cannot send message:', msg);
    }
  }

  /**
   * Closes the connection with WebSocket (communicating .complete() to the server).
   */
  close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
    this.connectionStatusSubject.next(false);
  }

  /**
   * Called when the service is destroyed (when Angular destroys the instance).
   * Here we close all open subscriptions.
   */
  ngOnDestroy(): void {
    this.close();
  }
}
