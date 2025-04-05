import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChatWebSocketService } from '@mtrybus/data-access-chat';
import {
  AvatarPlaceholderComponent,
  SharedAvatarPlaceholderService,
  SnackbarService,
} from '@mtrybus/ui';
import { EventAction, SocketMessage } from '@mtrybus/util-types';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { ChatMessage } from '../../types';
import { ChatBarComponent } from '../chat-bar/chat-bar.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatMessagesListComponent } from '../chat-messages-list/chat-messages-list.component';
import { RoomInfoComponent } from '../room-info/room-info.component';

// tutaj

@Component({
  selector: 'lib-feature-chat',
  imports: [
    CommonModule,
    RoomInfoComponent,
    ChatMessagesListComponent,
    ChatMessageComponent,
    ChatBarComponent,
    LottieComponent,
    AvatarPlaceholderComponent,
  ],
  templateUrl: './feature-chat.component.html',
  providers: [SharedAvatarPlaceholderService, MatSnackBar, SnackbarService],
})
export class FeatureChatComponent implements OnInit, AfterViewInit {
  private destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly chatWebSocketService = inject(ChatWebSocketService);
  private readonly sharedAvatarPlaceholderService = inject(
    SharedAvatarPlaceholderService
  );
  private readonly snackbarStateService = inject(SnackbarService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollContainer = viewChild<ElementRef>('scrollContainer');

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  readonly avatarNames =
    this.sharedAvatarPlaceholderService.getUniqueAvatarNamesPair();

  readonly isConnected = toSignal<SocketMessage>(
    this.chatWebSocketService.isConnected$
  );

  readonly connectionId = computed(
    () => this.isConnected()?.data?.connectionId
  );
  readonly sendMessageEvent = toSignal(
    this.chatWebSocketService.sendMessageEvent$
  );
  readonly connectionStatus = toSignal(
    this.chatWebSocketService.connectionStatus$
  );
  readonly disconnectEvent = toSignal(
    this.chatWebSocketService.disconnectEvent$
  );

  readonly disconnectEffect = effect(() => {
    const disconnectEvent = this.disconnectEvent();

    if (!disconnectEvent) {
      return;
    }

    this.snackbarStateService.openSnackbar({
      message: 'Hello asd sa dasd ',
      type: 'success',
    });

    this.router.navigate(['/']);
  });

  readonly connectionStatusEffect = effect(() => {
    const connectionStatus = this.connectionStatus();

    if (!connectionStatus) {
      return;
    }
  });
  readonly conversationEffect = effect(() => {
    const sendMessageEvent = this.sendMessageEvent();
    if (!sendMessageEvent) {
      return;
    }

    untracked(() => {
      const isHost = sendMessageEvent.data?.from === sendMessageEvent.data?.to;
      const name = isHost ? 'You' : 'Stranger';

      const chatMessage: ChatMessage = {
        text: sendMessageEvent.data?.message ?? '',
        createdAt: Date.now(),
        isHost,
        user: { id: 1, name },
      };

      this.messagesArray.update((prev) => [...prev, chatMessage]);
    });
  });

  readonly messagesArray = signal<ChatMessage[]>([]);

  readonly scrollToBottomEffect = effect(() => {
    this.scrollToBottom();
  });

  readonly lottieOptions: AnimationOptions = {
    path: '/assets/chat-spin/images/loader.json',
    loop: true,
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.chatWebSocketService.close();
    });
  }

  onCloseChat(): void {
    this.chatWebSocketService.close();
    this.router.navigate(['/']);
  }

  onSendMessage(message: string): void {
    this.chatWebSocketService.sendMessage({
      action: EventAction.SEND_MESSAGE,
      data: {
        message,
      },
    });
  }

  scrollToBottom(): void {
    const scrollContainer = this.scrollContainer();

    if (!scrollContainer) {
      return;
    }

    requestAnimationFrame(() => {
      scrollContainer.nativeElement.scrollTop =
        scrollContainer.nativeElement.scrollHeight;
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.chatWebSocketService.connect();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
}
