import { Injectable, signal } from '@angular/core';
import { FileAttachment } from '@mtrybus/util-types';

@Injectable({
  providedIn: 'root',
})
export class ChatUploadedFilesService {
  readonly uploadedFiles = signal<FileAttachment[]>([]);

  addFiles(files: FileAttachment[]): void {
    this.uploadedFiles.update((prev) => [...prev, ...files]);
  }

  removeFile(fileId: string): void {
    this.uploadedFiles.update((prev) => prev.filter(({ id }) => id !== fileId));
  }
}
