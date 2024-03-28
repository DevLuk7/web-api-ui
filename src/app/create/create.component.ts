import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Post, PostService } from '../api';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, EditorModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  private readonly postService = inject(PostService);

  readonly formGroup = new FormGroup({
    title: new FormControl<Post['title']>('', [Validators.required]),
    content: new FormControl<Post['content']>('', [Validators.required]),
  });

  save() {
    this.postService
      .apiPostPost({
        ...this.formGroup.getRawValue(),
      })
      .subscribe();
  }
}
