import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@mtrybus/util-config';
import { SKIP_ERROR_HANDLER } from '@mtrybus/util-http-requests';
import { FileAttachment } from '@mtrybus/util-types';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataAccessAttachmentService {
  private readonly httpClient = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);

  getPresignedUrl$(attachment: FileAttachment): Observable<{ url: string }> {
    return this.httpClient
      .post<{ url: string }>(
        `${this.appConfig.chatSpinFilesApiUrl}/photos`,
        {
          filename: attachment.file.name,
        },
        {
          context: new HttpContext().set(SKIP_ERROR_HANDLER, true),
        }
      )
      .pipe(
        catchError((error) => {
          return of({
            url: '',
            id: attachment.id,
            isSuccess: false,
            error,
          });
        })
      );
  }

  uploadFileToS3$(
    attachment: FileAttachment,
    presignedUrl: string
  ): Observable<{
    isSuccess: boolean;
  }> {
    return this.httpClient
      .put(presignedUrl, attachment.file, {
        context: new HttpContext().set(SKIP_ERROR_HANDLER, true),
      })
      .pipe(
        map(() => ({
          isSuccess: true,
        })),
        catchError((error) => {
          return of({
            id: attachment.id,
            isSuccess: false,
            error,
          });
        })
      );
  }
}
