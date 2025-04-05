import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TypeClassPipe } from './snackbar-type-class.pipe';
import { SNACKBAR_DATA } from './snackbar.model';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'lib-snackbar',
  imports: [TypeClassPipe],
  templateUrl: './snackbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedSnackbarComponent {
  private readonly snackbarService = inject(SnackbarService);
  readonly data = inject(SNACKBAR_DATA);

  onClose() {
    this.snackbarService.closeSnackbar();
  }
}
