import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly http = inject(HttpClient);
  readonly savedInProgress$$ = new BehaviorSubject<boolean>(false);
  showMessage = false;

  readonly emailForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  onSubmit() {
    if (this.emailForm.valid) {
      this.savedInProgress$$.next(true);
      this.http.post('https://aysi8ffk7c.execute-api.eu-north-1.amazonaws.com/default/newsletter', { email: this.emailForm.getRawValue().email }).subscribe(() => {
        this.emailForm.reset();
        this.savedInProgress$$.next(false);
        this.showMessage = true;
      });
    }
  }
}
