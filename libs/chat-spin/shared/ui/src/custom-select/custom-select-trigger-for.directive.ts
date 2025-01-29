/* eslint-disable @angular-eslint/no-input-rename */
import {
  Directive,
  inject,
  ElementRef,
  input,
  ViewContainerRef,
  signal,
} from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { CustomSelect } from '../interfaces';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Subscription } from 'rxjs';

@Directive({
  selector: '[libCustomSelectTriggerFor]',
  standalone: true,
  host: {
    '(click)': 'toggleDropdown()',
  },
  exportAs: 'libCustomSelectTriggerFor',
})
export class CustomSelectTriggerForDirective {
  public dropdownPanel = input.required<CustomSelect>({
    alias: 'libCustomSelectTriggerFor',
  });
  public isDropdownOpen = signal(false);

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef!: OverlayRef;
  private dropdownClosingActionsSub = Subscription.EMPTY;

  toggleDropdown(): void {
    this.isDropdownOpen() ? this.destroyDropdown() : this.openDropdown();
  }

  openDropdown(): void {
    this.isDropdownOpen.set(true);
    const dropdownPanel = this.dropdownPanel();

    if (!dropdownPanel) {
      return;
    }

    this.overlayRef = this.overlay.create(this.getOverlayConfig());

    const templatePortal = new TemplatePortal(
      dropdownPanel.templateRef,
      this.viewContainerRef
    );

    this.overlayRef.attach(templatePortal);
    this.syncWidth();
    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(
      () => this.destroyDropdown()
    );
  }

  destroyDropdown(): void {
    this.overlayRef.detach();
    this.isDropdownOpen.set(false);
    this.dropdownClosingActionsSub.unsubscribe();
  }

  private dropdownClosingActions() {
    const backdropClick$ = this.overlayRef.backdropClick();
    const dropdownClosed$ = outputToObservable(this.dropdownPanel().closed);

    return merge(backdropClick$, dropdownClosed$);
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
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}
