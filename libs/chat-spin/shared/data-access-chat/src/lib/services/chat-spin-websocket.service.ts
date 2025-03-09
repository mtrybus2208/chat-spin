import { DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Subject, of, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ChatWebSocketService implements OnDestroy {
  private destroyRef = inject(DestroyRef);

  private readonly WS_ENDPOINT =
    'wss://n6cp5yn4nl.execute-api.us-east-2.amazonaws.com/dev/';

  private socket$: WebSocketSubject<any> | undefined;

  /**
   * Stream informing about the connection status.
   * We can emit `true` (connected), `false` (disconnected).
   */
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  /**
   * Stream for incoming messages from WebSocket.
   */
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  /**
   * Establishes a connection with WebSocket if there is no active or closed connection.
   */
  connect(): void {
    // If socket doesn't exist or is closed, we open a new one
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket({
        url: this.WS_ENDPOINT,
        openObserver: {
          next: () => {
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
            // You can also initiate e.g. reconnect, here is a simple error return
            return of(null);
          })
        )
        .subscribe((message) => {
          console.log('Message received: ', message);
          this.messagesSubject.next(message);
        });

      // Zakładamy, że skoro subskrypcja się udała, to jesteśmy połączeni
      this.connectionStatusSubject.next(true);
    }
  }

  /**
   * Sends a message to the server via WebSocket (if the connection is active).
   */
  sendMessage(msg: any): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next(msg);
    } else {
      console.warn('WebSocket is not connected. Cannot send message:', msg);
    }
  }

  /**
   * Closes the connection with WebSocket (communicating .complete() to the server).
   */
  close(): void {
    if (this.socket$ && !this.socket$.closed) {
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
