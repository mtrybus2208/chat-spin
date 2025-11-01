export interface AttachmentsConfig {
  allowedExtensions: string[];
  maxFileSize: number;
  maxFilesAmount: number;
}

export const megabytesToBytes = (mb: number): number => mb * 1024 * 1024;
export const bytesToMegabytes = (bytes: number): number => bytes / 1024 / 1024;

export const DEFAULT_FILE_SIZE_MB = 10;
export const DEFAULT_ATTACHMENTS_CONFIG: AttachmentsConfig = {
  allowedExtensions: [],
  maxFilesAmount: 1,
  maxFileSize: megabytesToBytes(DEFAULT_FILE_SIZE_MB),
};
