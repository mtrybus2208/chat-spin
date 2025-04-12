import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileAttachment } from '@mtrybus/util-types';
@Component({
  selector: 'lib-chat-image-thumbnail',
  imports: [MatIconModule],
  templateUrl: './chat-image-thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatImageThumbnailComponent {
  readonly attachment = input<FileAttachment>();
  readonly removeAttachment = output<string>();

  onRemoveFile(): void {
    const attachment = this.attachment();
    if (!attachment?.id) {
      return;
    }
    this.removeAttachment.emit(attachment.id);
  }
}
