import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'lib-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
