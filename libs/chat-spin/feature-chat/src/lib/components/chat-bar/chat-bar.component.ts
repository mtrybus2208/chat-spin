import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-chat-bar',
  standalone: true,
  imports: [CommonModule, ChatInputComponent, TextFieldModule, MatIconModule],
  templateUrl: './chat-bar.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ChatBarComponent {
  @Output() closeChat = new EventEmitter<void>();

  onCloseChat(): void {
    this.closeChat.emit();
  }
}
