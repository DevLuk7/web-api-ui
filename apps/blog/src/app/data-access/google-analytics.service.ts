import { DOCUMENT } from '@angular/common';
import { Injectable, inject, isDevMode } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WINDOW, config } from '../app.config';

@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly window = inject(WINDOW, { optional: true });
  private readonly router = inject(Router);

  private readonly trackingId = config().googleAnalyticsId;

  constructor() {
    if (!isDevMode() && this.trackingId) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.trackPageView(event.urlAfterRedirects);
        }
      });
    }
  }

  private trackPageView(pagePath: string) {
    this.window?.gtag('config', this.trackingId, {
      page_path: pagePath,
    });
  }

  public event(eventName: string, params: Record<string, unknown>) {
    if (!isDevMode() && this.trackingId) {
      this.window?.gtag('event', eventName, params);
    }
  }

  loadGoogleAnalytics() {
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
    this.document.head.appendChild(script);

    const script2 = this.document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', ${this.trackingId});
    `;
    this.document.head.appendChild(script2);
  }
}
