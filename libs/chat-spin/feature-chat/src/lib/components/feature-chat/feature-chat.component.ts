import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomInfoComponent } from '../room-info/room-info.component';
import { ChatMessagesListComponent } from '../chat-messages-list/chat-messages-list.component';
import { ChatMessage } from '../../types';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatBarComponent } from '../chat-bar/chat-bar.component';

@Component({
  selector: 'lib-feature-chat',
  standalone: true,
  imports: [
    CommonModule,
    RoomInfoComponent,
    ChatMessagesListComponent,
    ChatMessageComponent,
    ChatBarComponent,
  ],
  templateUrl: './feature-chat.component.html',
})
export class FeatureChatComponent {
  public chatMessages = signal<ChatMessage[]>([
    {
      text: 'Cześć, jak się masz?',
      createdAt: Date.now(),
      isHost: true,
      user: { id: 1, name: 'Ania' },
    },
    {
      text: 'Dobrze, dziękuję! A ty?',
      createdAt: Date.now() + 1000,
      isHost: false,
      user: { id: 2, name: 'Tomek' },
    },
    {
      text: 'Czy ktoś widział mój kubek?',
      createdAt: Date.now() + 2000,
      isHost: true,
      user: { id: 1, name: 'Ania' },
    },
    {
      text: 'Tak, był na stole.',
      createdAt: Date.now() + 3000,
      isHost: false,
      user: { id: 3, name: 'Kasia' },
    },
    {
      text: 'Super, dzięki za pomoc!',
      createdAt: Date.now() + 4000,
      isHost: false,
      user: { id: 4, name: 'Michał' },
    },
    {
      text: 'Czy ktoś widział mój kubek?',
      createdAt: Date.now() + 2000,
      isHost: true,
      user: { id: 1, name: 'Ania' },
    },
    {
      text: 'Tak, był na stole.',
      createdAt: Date.now() + 3000,
      isHost: false,
      user: { id: 3, name: 'Kasia' },
    },
    {
      text: 'Super, dzięki za pomoc!',
      createdAt: Date.now() + 4000,
      isHost: false,
      user: { id: 4, name: 'Michał' },
    },
  ]);
}
