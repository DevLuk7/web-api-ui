import { Component, inject, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoogleAnalyticsService } from './data-access/google-analytics.service';
import { FooterComponent } from './ui/footer/footer.component';
import { NavigationComponent } from './ui/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly googleAnalyticsService = inject(GoogleAnalyticsService);

  constructor() {
    if (!isDevMode()) {
      this.googleAnalyticsService.loadGoogleAnalytics();
    }
  }
}
