import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

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
