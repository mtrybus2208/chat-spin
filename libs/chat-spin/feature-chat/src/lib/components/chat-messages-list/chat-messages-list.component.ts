import { Component, input } from '@angular/core';


import { ChatMessage } from '../../types';

@Component({
  selector: 'lib-chat-messages-list',
  imports: [],
  templateUrl: './chat-messages-list.component.html',
})
export class ChatMessagesListComponent {
  readonly messages = input<ChatMessage[]>([]);
}
