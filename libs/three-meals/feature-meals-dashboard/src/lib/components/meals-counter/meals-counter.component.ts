import {
  ChangeDetectionStrategy,
  Component,
  effect,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'lib-meals-counter',
  imports: [],
  templateUrl: './meals-counter.component.html',
  styleUrl: './meals-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsCounterComponent {
  readonly counter = signal<number>(3);
  readonly counterChange = output<number>();

  readonly minValue = 1;
  readonly maxValue = 10;

  constructor() {
    effect(() => {
      this.counterChange.emit(this.counter());
    });
  }

  onDecrement(): void {
    if (this.counter() > this.minValue) {
      this.counter.update((prev) => prev - 1);
    }
  }

  onIncrement(): void {
    if (this.counter() < this.maxValue) {
      this.counter.update((prev) => prev + 1);
    }
  }
}
