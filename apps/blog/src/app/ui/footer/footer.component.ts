import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '@web-api-ui/web-api';
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
  private readonly newsletterService = inject(NewsletterService);
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
      this.newsletterService.apiNewsletterPost(this.emailForm.getRawValue().email).subscribe(() => {
        this.emailForm.reset();
        this.savedInProgress$$.next(false);
        this.showMessage = true;
      });
    }
  }
}
