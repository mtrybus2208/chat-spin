import { OverlayRef } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { Subject, take, takeUntil, timer } from 'rxjs';

import { SnackbarRef } from './snackbar-ref.class';
import { SnackbarData } from './snackbar.model';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly snackbarRef = inject(SnackbarRef);
  private timerCloseSubject = new Subject<void>();

  openSnackbar(data: SnackbarData): OverlayRef | null {
    if (this.snackbarRef.overlayRef?.hasAttached()) {
      return this.snackbarRef.overlayRef;
    }

    this.handlerTimer(data?.duration);

    return this.snackbarRef.createAndAttachComponent(data);
  }

  closeSnackbar(): void {
    this.snackbarRef.close();
    this.timerCloseSubject.next();
    this.timerCloseSubject.complete();
  }

  private handlerTimer(duration?: number): void {
    if (duration === 0) {
      return;
    }

    timer(duration ?? 3000)
      .pipe(take(1), takeUntil(this.timerCloseSubject))
      .subscribe(() => this.closeSnackbar());
  }
}
