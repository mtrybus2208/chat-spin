import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@mtrybus/ui';
import { FileAttachment } from '@mtrybus/util-types';
import { concatMap, map, Observable, of, Subject, tap } from 'rxjs';

import {
  DataAccessAttachmentService,
  PresignedUrlResponse,
} from './attachments-data-access.service';

export type UploadFileResponse = {
  file: FileAttachment;
  isSuccess: boolean;
  id: string;
  objectKey: string;
};

@Injectable({
  providedIn: 'root',
})
export class AttachmentsQueueService {
  readonly uploadedFiles = signal<FileAttachment[]>([]);
  readonly dataAccessAttachmentService = inject(DataAccessAttachmentService);
  private readonly snackbarStateService = inject(SnackbarService);

  private queue$ = new Subject<FileAttachment>();

  private readonly uploadFileStream$ = this.queue$.pipe(
    tap((file) => {
      this.addFile({ ...file, isUploading: true });
    }),
    concatMap((file) => this.getPresignedUrl$(file)),
    concatMap(({ file, response }) => this.uploadFile$(file, response)),
    tap(({ file, isSuccess }) => {
      this.handleUploadFileResponse(file, isSuccess);
    })
  );

  constructor() {
    this.uploadFileStream$.pipe(takeUntilDestroyed()).subscribe();
  }

  enqueueFiles(file: FileAttachment): void {
    this.queue$.next(file);
  }

  addFile(file: FileAttachment): void {
    this.uploadedFiles.update((prev) => [...prev, file]);
  }

  removeFile(fileId: string): void {
    this.uploadedFiles.update((prev) => prev.filter(({ id }) => id !== fileId));
  }

  private handleUploadFileResponse(
    file: FileAttachment,
    isSuccess: boolean
  ): void {
    console.log({ FILE: file, IS_SUCCESS: isSuccess });
    if (isSuccess) {
      return this.updateAttachmentList(file.id ?? '', {
        ...file,
        isUploading: false,
        objectKey: file.objectKey ?? '',
      });
    }
    this.removeFile(file.id ?? '');
    this.snackbarStateService.openSnackbar({
      message: 'Failed to upload file',
      type: 'error',
    });
  }

  private uploadFile$(
    file: FileAttachment,
    presignedUrl: PresignedUrlResponse
  ): Observable<{
    file: FileAttachment;
    isSuccess: boolean;
  }> {
    console.log({ FILE_Z_OBJECTKEY: file, PRESIGNED_URL: presignedUrl });
    if (presignedUrl) {
      return this.dataAccessAttachmentService
        .uploadFileToS3$(file, presignedUrl.url)
        .pipe(
          map(() => ({
            file: { ...file, objectKey: presignedUrl.objectKey },
            isSuccess: true,
          }))
        );
    }

    return of({
      file,
      isSuccess: false,
    });
  }

  private getPresignedUrl$(file: FileAttachment): Observable<{
    file: FileAttachment;
    response: PresignedUrlResponse;
  }> {
    return this.dataAccessAttachmentService.getPresignedUrl$(file).pipe(
      map((response) => ({
        file,
        response,
      }))
    );
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
}
