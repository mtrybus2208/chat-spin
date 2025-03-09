import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-chat-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  @ViewChild('chatInput') chatInputRef!: ElementRef<HTMLTextAreaElement>;

  adjustTextareaHeight(): void {
    const textarea = this.chatInputRef.nativeElement;
    textarea.style.height = 'auto'; // Resetowanie wysokości
    textarea.style.height = `${textarea.scrollHeight}px`; // Ustawienie wysokości na podstawie zawartości
  }

  onShiftEnter(event: Event): void {
    event.preventDefault(); // Zapobieganie domyślnej akcji (nowa linia)
    this.adjustTextareaHeight();
  }
}
