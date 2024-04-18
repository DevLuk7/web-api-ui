import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './ui/footer/footer.component';
import { NavigationComponent } from './ui/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
