import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'lib-file-upload-button',
  templateUrl: './file-upload-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadButtonComponent {
  readonly multiple = input<boolean>(false);
  readonly allowedFileExtensions = input<string[]>([
    'JPG, JPEG, PNG, WEBP, BMP',
  ]);
  readonly fileChange = output<File[]>();
  readonly fileInput = viewChild<ElementRef>('fileInput');

  readonly allowedFileExtensionsString = computed(() =>
    this.allowedFileExtensions().join(',')
  );

  onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    const fileInput = this.fileInput();

    if (!files || !fileInput) {
      return;
    }

    this.fileChange.emit(Array.from(files));
    fileInput.nativeElement.value = '';
  }
}
