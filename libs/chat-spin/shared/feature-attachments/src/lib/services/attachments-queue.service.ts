import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@mtrybus/ui';
import { FileAttachment } from '@mtrybus/util-types';
import { combineLatest, of, Subject, switchMap, tap } from 'rxjs';

import { DataAccessAttachmentService } from './attachments-data-access.service';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsQueueService {
  readonly uploadedFiles = signal<FileAttachment[]>([]);
  readonly dataAccessAttachmentService = inject(DataAccessAttachmentService);
  private readonly snackbarStateService = inject(SnackbarService);

  private queue$ = new Subject<FileAttachment>();

  constructor() {
    this.queue$
      .pipe(
        takeUntilDestroyed(),
        tap((file) => {
          this.validateFile(file);
          this.addFile({ ...file, isUploading: true });
        }),
        switchMap((file) =>
          combineLatest([
            of(file),
            this.dataAccessAttachmentService.getPresignedUrl$(file),
          ])
        ),
        switchMap(([file, presignedUrl]) =>
          combineLatest([
            of(file),
            presignedUrl
              ? this.dataAccessAttachmentService.uploadFileToS3$(
                  file,
                  presignedUrl.url
                )
              : of({
                  isSuccess: false,
                }),
          ])
        ),
        tap(([file, response]) => {
          if (response.isSuccess) {
            return this.updateAttachmentList(file.id, {
              ...file,
              isUploading: false,
            });
          }
          this.removeFile(file.id);
          this.snackbarStateService.openSnackbar({
            message: 'Failed to upload file',
            type: 'error',
          });
        })
      )
      .subscribe();
  }

  private updateAttachmentList(
    id: string,
    newAttachment: FileAttachment
  ): void {
    this.uploadedFiles.update((prev) =>
      prev.map((attachment) => {
        return attachment.id === id ? newAttachment : attachment;
      })
    );
  }

  enqueueFiles(file: FileAttachment): void {
    this.queue$.next(file);
  }

  validateFile(file: FileAttachment): FileAttachment {
    if (file.file.size > 10 * 1024 * 1024) {
      alert('File size is too large');
      throw new Error('File size is too large');
    }
    return file;
  }

  addFile(file: FileAttachment): void {
    this.uploadedFiles.update((prev) => [...prev, file]);
  }

  removeFile(fileId: string): void {
    this.uploadedFiles.update((prev) => prev.filter(({ id }) => id !== fileId));
  }
}
