import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import { GeneratePostDto, GenerateService, Post } from '../api';
import { PostsStore } from '../data-access/posts.store';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, EditorModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  readonly postsStore = inject(PostsStore);
  readonly generateService = inject(GenerateService);

  readonly generateFormGroup = new FormGroup({
    description: new FormControl<string>('', Validators.required),
  });

  generate() {
    this.generateService
      .apiGeneratePostPost(this.generateFormGroup.getRawValue().description || '')
      .subscribe((res) => {
        this.formGroup.patchValue(res);
      });
  }

  readonly formGroup = new FormGroup({
    title: new FormControl<Post['title']>('', [Validators.required]),
    content: new FormControl<Post['content']>('', [Validators.required]),
    image: new FormControl<GeneratePostDto['image']>('', [Validators.required]),
  });

  save() {
    this.postsStore.createPost(this.formGroup.getRawValue());
  }
}
