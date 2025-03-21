import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ChatMessage } from '../../types';

@Component({
  selector: 'lib-chat-message',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent {
  public message = input.required<ChatMessage>();
}
