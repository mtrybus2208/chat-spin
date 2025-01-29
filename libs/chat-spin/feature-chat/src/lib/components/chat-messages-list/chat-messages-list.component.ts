import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatMessage } from '../../types';

@Component({
  selector: 'lib-chat-messages-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-messages-list.component.html',
})
export class ChatMessagesListComponent {
  public messages = input<ChatMessage[]>([]);
}
