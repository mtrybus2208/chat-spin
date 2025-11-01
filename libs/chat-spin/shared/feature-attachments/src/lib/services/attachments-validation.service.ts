import { Injectable } from '@angular/core';
import { FileAttachment } from '@mtrybus/util-types';
import { DEFAULT_ATTACHMENTS_CONFIG } from '../constants';

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AttachmentsValidationService {
  validateFile(file: FileAttachment): ValidationResult {
    if (
      file.file?.size &&
      file.file.size > DEFAULT_ATTACHMENTS_CONFIG.maxFileSize
    ) {
      return {
        isValid: false,
        message: 'File size is too large',
      };
    }
    return {
      isValid: true,
    };
  }
}
