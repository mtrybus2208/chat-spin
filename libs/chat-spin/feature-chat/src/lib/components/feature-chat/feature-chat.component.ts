import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  OnDestroy,
  PLATFORM_ID,
  computed,
  untracked,
  viewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { RoomInfoComponent } from '../room-info/room-info.component';
import { ChatMessagesListComponent } from '../chat-messages-list/chat-messages-list.component';
import { ChatMessage } from '../../types';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatBarComponent } from '../chat-bar/chat-bar.component';
import { ChatWebSocketService } from '@mtrybus/data-access-chat';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  AvatarPlaceholderComponent,
  SharedAvatarPlaceholderService,
} from '@mtrybus/ui';

import { filter } from 'rxjs';
@Component({
  selector: 'lib-feature-chat',
  standalone: true,
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
  providers: [SharedAvatarPlaceholderService],
})
export class FeatureChatComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly chatWebSocketService = inject(ChatWebSocketService);
  private readonly sharedAvatarPlaceholderService = inject(
    SharedAvatarPlaceholderService
  );

  readonly avatarNames =
    this.sharedAvatarPlaceholderService.getUniqueAvatarNamesPair();

  readonly isConnected = toSignal(
    this.chatWebSocketService.messages$.pipe(
      filter((message: any) => message?.action === 'connected')
    ),
    {
      initialValue: false,
    }
  );
  readonly connectionId = computed(() => {
    return this.isConnected()?.data?.connectionId;
  });

  private readonly scrollContainer = viewChild<ElementRef>('scrollContainer');

  readonly sendMessageEvent = toSignal(
    this.chatWebSocketService.messages$.pipe(
      filter((message: any) => message?.action === 'sendMessage')
    ),
    {
      initialValue: false,
    }
  );

  readonly connectionStatus = toSignal(
    this.chatWebSocketService.connectionStatus$
  );
  readonly connectionStatusEffect = effect(() => {
    const connectionStatus = this.connectionStatus();
    console.log({
      connectionStatus,
    });
    if (!connectionStatus) {
      return;
    }
  });
  readonly messagesArray = signal<ChatMessage[]>([]);

  readonly conversationEffect = effect(
    () => {
      const sendMessageEvent = this.sendMessageEvent();
      if (!sendMessageEvent) {
        return;
      }

      untracked(() => {
        const isHost = sendMessageEvent.data.from === sendMessageEvent.data.to;
        const name = isHost ? 'You' : 'Stranger';

        const chatMessage: ChatMessage = {
          text: sendMessageEvent.data.message,
          createdAt: Date.now(),
          isHost,
          user: { id: 1, name },
        };

        this.messagesArray.update((prev) => [...prev, chatMessage]);
      });
    },
    {
      allowSignalWrites: true,
    }
  );

  loll = effect(() => {
    const msgs = this.messagesArray();
    this.scrollToBottom();
    // Czekamy na następny cykl, żeby mieć pewność że DOM się zaktualizował
    // setTimeout(() => this.scrollToBottom(), 0);
  });

  private readonly platformId = inject(PLATFORM_ID);

  // readonly isConnected = signal(false);

  readonly lottieOptions: AnimationOptions = {
    path: '/assets/chat-spin/images/loader.json',
    loop: true,
  };

  onCloseChat(): void {
    console.log('close');
    this.chatWebSocketService.close();
  }

  onSendMessage(message: string): void {
    console.log('send message', message);
    this.chatWebSocketService.sendMessage({
      action: 'sendMessage',
      data: {
        message,
      },
    });
  }

  scrollToBottom(): void {
    const scrollContainer = this.scrollContainer();

    console.log({
      scrollContainer12122121: scrollContainer,
    });
    if (!scrollContainer) {
      return;
    }

    requestAnimationFrame(() => {
      scrollContainer.nativeElement.scrollTop =
        scrollContainer.nativeElement.scrollHeight;
    });
  }

  ngOnInit(): void {
    console.log('init');
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.chatWebSocketService.connect();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.chatWebSocketService.close();
  }
}
