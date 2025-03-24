import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-chat-bar',
  imports: [
    CommonModule,
    ChatInputComponent,
    TextFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
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
  readonly closeChat = output<void>();
  readonly sendMessage = output<string>();

  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.group({
    message: ['', Validators.required],
  });

  onCloseChat(): void {
    this.closeChat.emit();
  }

  onSendMessage(): void {
    const { message } = this.form.getRawValue();
    if (!message) {
      return;
    }

    this.sendMessage.emit(message);
    this.form.reset();
  }
}
