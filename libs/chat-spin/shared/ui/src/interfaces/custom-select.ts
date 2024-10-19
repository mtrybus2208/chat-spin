import { EventEmitter, TemplateRef } from '@angular/core';

export interface CustomSelect {
  templateRef: TemplateRef<unknown>;
  readonly closed: EventEmitter<void>;
}
