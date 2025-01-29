import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatMessage } from '../../types';

@Component({
  selector: 'lib-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent {
  public message = input.required<ChatMessage>();
}
