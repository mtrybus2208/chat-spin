/* eslint-disable @angular-eslint/no-input-rename */
import {
  Directive,
  inject,
  ElementRef,
  input,
  effect,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';

import { CustomSelectListComponent } from '../custom-select-list/custom-select-list.component';
import { CustomSelect } from '../interfaces';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[libCustomSelectTriggerFor]',
  standalone: true,
  host: {
    '(click)': 'toggleDropdown()',
  },
})
export class CustomSelectTriggerForDirective {
  dropdownPanel = input<CustomSelectListComponent | null>(null, {
    alias: 'libCustomSelectTriggerFor',
  });

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);

  private overlayRef!: OverlayRef;
  private isDropdownOpen = false;

  constructor() {
    effect(() => {
      console.log(`The current`);
      console.log({ dropdownPanel: this.dropdownPanel() });
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  private destroyDropdown(): void {
    this.overlayRef.detach();
    this.isDropdownOpen = false;
  }

  private openDropdown(): void {
    const dropdownPanel = this.dropdownPanel();
    if (!dropdownPanel) {
      return;
    }

    this.isDropdownOpen = true;

    this.overlayRef = this.overlay.create(this.getOverlayConfig());

    const templatePortal = new TemplatePortal(
      dropdownPanel.templateRef,
      this.viewContainerRef
    );

    this.overlayRef.attach(templatePortal);

    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.destroyDropdown());
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return;
    }

    const refRectWidth =
      this.elementRef.nativeElement.getBoundingClientRect().width;
    this.overlayRef.updateSize({ width: refRectWidth });
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -4,
          },
        ]),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}

// https://blog.angular-university.io/angular-signal-components/
