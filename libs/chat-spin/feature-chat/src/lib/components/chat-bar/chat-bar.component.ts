import { CommonModule } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';

import { TextFieldModule } from '@angular/cdk/text-field';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  AttachmentsQueueService,
  AttachmentsValidationService,
} from '@mtrybus/feature-attachments';
import { FileUploadButtonComponent, SnackbarService } from '@mtrybus/ui';
import { MessageData } from '@mtrybus/util-types';
import { v4 as uuidv4 } from 'uuid';
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
  styleUrl: './chat-bar.component.scss',
})
export class ChatBarComponent {
  readonly closeChat = output<void>();
  readonly sendMessage = output<MessageData>();
  private readonly formBuilder = inject(FormBuilder);
  private readonly attachmentsQueueService = inject(AttachmentsQueueService);
  private readonly attachmentsValidationService = inject(
    AttachmentsValidationService
  );
  private readonly snackbarStateService = inject(SnackbarService);

  readonly form = this.formBuilder.group({
    message: ['', Validators.required],
  });

  readonly uploadedFiles = this.attachmentsQueueService.uploadedFiles;
  readonly uploadedFiles$ = toObservable(this.uploadedFiles);
  readonly fileAttachments = computed(() => {
    return this.uploadedFiles().map(({ file, id, ...rest }) => {
      console.log({ FILE: file, ID: id, REST: rest });
      return {
        file,
        id: id ?? uuidv4(),
        url: file ? URL.createObjectURL(file) : undefined,
        ...rest,
      };
    });
  });
  readonly attachmentsToSend = computed(() =>
    this.fileAttachments().map(({ objectKey }) => ({
      objectKey: objectKey ?? '',
    }))
  );
  readonly isImagesUploading = computed(() =>
    this.uploadedFiles().some(({ isUploading }) => isUploading)
  );

  onCloseChat(): void {
    this.closeChat.emit();
  }

  onFileChange(files: File[]): void {
    Array.from(files).forEach((file) => {
      const attachment = {
        file,
        id: uuidv4(),
      };
      if (!this.attachmentsValidationService.validateFile(attachment)) {
        this.snackbarStateService.openSnackbar({
          message: 'File size is too large',
          type: 'error',
        });
        return;
      }
      this.attachmentsQueueService.enqueueFiles(attachment);
    });
  }

  onSendMessage(): void {
    const { message } = this.form.getRawValue();

    if (!message) {
      return;
    }
    console.log({
      COLECITON: {
        message,
        attachments: this.attachmentsToSend(),
      },
    });

    this.sendMessage.emit({
      message,
      attachments: this.attachmentsToSend(),
    });
    this.form.reset();
  }

  onTextareaEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.shiftKey) {
      return;
    }
    event.preventDefault();
    this.onSendMessage();
  }

  onRemoveAttachment(attachmentId: string): void {
    this.attachmentsQueueService.removeFile(attachmentId);
  }
}
