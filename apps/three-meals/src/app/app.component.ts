import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { combineLatest } from 'rxjs';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected title = 'three-meals';

  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  readonly isAuthenticated = signal<boolean>(false);

  ngOnInit(): void {
    combineLatest([
      this.oidcSecurityService.isAuthenticated$,
      this.configuration$,
    ]).subscribe(([isAuthenticated, configuration]) => {
      console.log({
        isAuthenticated,
        configuration,
      });
      this.isAuthenticated.set(isAuthenticated.isAuthenticated);
    });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }
}
