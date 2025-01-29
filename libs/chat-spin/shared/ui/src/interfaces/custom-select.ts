import { OutputEmitterRef, TemplateRef } from '@angular/core';

export interface CustomSelect {
  templateRef: TemplateRef<unknown>;
  closed: OutputEmitterRef<void>;
}
