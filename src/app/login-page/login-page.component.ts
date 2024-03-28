import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly auth = inject(AuthService);
  readonly isAuthenticated$ = this.auth.isAuthenticated$;

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.document.location.origin } });
  }

  ping() {
    this.http.get('http://localhost:5145/api/Item').subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }
}
