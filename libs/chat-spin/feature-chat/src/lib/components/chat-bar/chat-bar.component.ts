import { CommonModule } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';

import { TextFieldModule } from '@angular/cdk/text-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadButtonComponent } from '@mtrybus/ui';
import { v4 as uuidv4 } from 'uuid';
import { ChatUploadedFilesService } from '../../services';
import { ChatImageThumbnailComponent } from '../chat-image-thumbnail/chat-image-thumbnail.component';

@Component({
  selector: 'lib-chat-bar',
  imports: [
    CommonModule,
    TextFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FileUploadButtonComponent,
    ChatImageThumbnailComponent,
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
  private readonly chatUploadedFilesService = inject(ChatUploadedFilesService);

  readonly form = this.formBuilder.group({
    message: ['', Validators.required],
  });

  readonly uploadedFiles = this.chatUploadedFilesService.uploadedFiles;

  readonly fileAttachments = computed(() => {
    return this.uploadedFiles().map(({ file, id }) => ({
      file,
      id: id ?? uuidv4(),
      url: URL.createObjectURL(file),
    }));
  });

  onCloseChat(): void {
    this.closeChat.emit();
  }

  onFileChange(files: File[]): void {
    const attachments = files.map((file) => ({
      file,
      id: uuidv4(),
    }));
    this.chatUploadedFilesService.addFiles(attachments);
  }

  onSendMessage(): void {
    const { message } = this.form.getRawValue();

    if (!message) {
      return;
    }

    this.sendMessage.emit(message);
    this.form.reset();
  }

  onRemoveAttachment(attachmentId: string): void {
    this.chatUploadedFilesService.removeFile(attachmentId);
  }
}
