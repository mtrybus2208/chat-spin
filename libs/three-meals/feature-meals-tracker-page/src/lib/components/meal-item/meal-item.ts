import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'lib-meal-item',
  imports: [DatePipe, SelectModule],
  templateUrl: './meal-item.html',
  styleUrl: './meal-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealItem {
  readonly time = input.required<Date>();
  readonly name = input.required<string>();
}
