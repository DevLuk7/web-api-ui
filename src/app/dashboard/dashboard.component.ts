import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly auth = inject(AuthService);
  readonly isAuthenticated$ = this.auth.isAuthenticated$;

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }

  ping() {
    this.http.get('http://localhost:5145/api/Item').subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }
}
