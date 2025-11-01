import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

export type ChatMessageInput = {
  createdAt: number;
  isHost: boolean;
  text: string;
};

@Component({
  selector: 'lib-chat-message',
  imports: [CommonModule, DatePipe],
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  readonly message = input.required<ChatMessageInput>();
  readonly user = input<{
    id: string;
    name: string;
  }>({
    id: '',
    name: '',
  });
}
