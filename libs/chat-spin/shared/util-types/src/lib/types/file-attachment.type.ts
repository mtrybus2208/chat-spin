export type FileAttachment = {
  id: string;
  file: File | null;
  url?: string;
  isUploading?: boolean;
  objectKey?: string;
};

export type FileToDisplay = {
  url?: string;
  isUploading?: boolean;
};
