import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { SharedSnackbarComponent } from './snackbar.component';
import { SNACKBAR_DATA, SnackbarData } from './snackbar.model';

@Injectable({
  providedIn: 'root',
})
export class SnackbarRef {
  private readonly overlay = inject(Overlay);

  private _afterClosed = new Subject<void>();
  overlayRef!: OverlayRef;

  private overlayConfig = new OverlayConfig({
    positionStrategy: this.overlay.position().global(),
  });

  close(): void {
    this.overlayRef.dispose();
    this._afterClosed.next();
    this._afterClosed.complete();
  }

  getOverlayRef(): OverlayRef {
    return this.overlayRef;
  }

  attachComponent(data: SnackbarData) {
    const injector = Injector.create({
      providers: [{ provide: SNACKBAR_DATA, useValue: data }],
    });

    return this.overlayRef.attach(
      new ComponentPortal(SharedSnackbarComponent, null, injector || null)
    );
  }

  afterClosed(): Observable<void> {
    return this._afterClosed.asObservable();
  }

  createOverlay(config?: Partial<OverlayConfig>): OverlayRef {
    this.overlayConfig = { ...this.overlayConfig, ...config };

    return (this.overlayRef = this.overlay.create(this.overlayConfig));
  }

  createAndAttachComponent(data: SnackbarData): OverlayRef {
    this.overlayRef = this.overlay.create(this.overlayConfig);
    this.attachComponent(data);
    return this.overlayRef;
  }
}
