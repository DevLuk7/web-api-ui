import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { config } from './app.config';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatListModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  readonly user$ = this.authService.user$;

  logout() {
    this.authService.logout({ logoutParams: { returnTo: config().redirect_uri } });
  }
}
