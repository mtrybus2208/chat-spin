import {
  Component,
  ElementRef,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-chat-input',
  imports: [CommonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  readonly chatInputRef =
    viewChild<ElementRef<HTMLTextAreaElement>>('chatInput');

  adjustTextareaHeight(): void {
    const textarea = this.chatInputRef()?.nativeElement;
    if (!textarea) {
      return;
    }
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  onShiftEnter(event: Event): void {
    event.preventDefault();
    this.adjustTextareaHeight();
  }
}
