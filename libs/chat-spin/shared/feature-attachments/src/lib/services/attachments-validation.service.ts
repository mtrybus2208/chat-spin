import { Injectable } from '@angular/core';
import { FileAttachment } from '@mtrybus/util-types';
import {
  ALLOWED_EXTENSIONS,
  DEFAULT_ATTACHMENTS_CONFIG,
  bytesToMegabytes,
} from '../constants';
import { AttachmentExtension } from '../enums';

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AttachmentsValidationService {
  validateFile(
    { file }: FileAttachment,
    allowedExtensions = ALLOWED_EXTENSIONS,
    maxFileSizeInBytes = DEFAULT_ATTACHMENTS_CONFIG.maxFileSize
  ): ValidationResult {
    if (!this.isCorrectFileExtension(file?.name ?? '', allowedExtensions)) {
      return {
        isValid: false,
        message: `Selected file type is not supported. Allowed extensions: ${allowedExtensions.join(
          ', '
        )}.`,
      };
    }
    if (!this.isCorrectMaxFileSize(file?.size ?? 0, maxFileSizeInBytes)) {
      return {
        isValid: false,
        message: `File size is too large, max size is ${bytesToMegabytes(
          maxFileSizeInBytes
        )} MB`,
      };
    }

    return {
      isValid: true,
      message: '',
    };
  }

  private isCorrectMaxFileSize(
    fileSize: number,
    allowedFileSize: number
  ): boolean {
    if (!allowedFileSize) {
      return true;
    }

    return fileSize <= allowedFileSize;
  }

  private isCorrectFileExtension(
    fileName: string,
    extensions = ALLOWED_EXTENSIONS
  ): boolean {
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);

    if (!extensions) {
      return true;
    }

    if (extension) {
      return (
        extensions.indexOf(extension.toLowerCase() as AttachmentExtension) !==
        -1
      );
    }

    return false;
  }
}
