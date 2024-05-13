import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Post, PostsService } from '@web-api-ui/web-api';
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
  readonly postsService = inject(PostsService);

  readonly generateFormGroup = new FormGroup({
    description: new FormControl<string>('', Validators.required),
  });

  generate() {
    this.postsService
      .postsControllerGenerate({ description: this.generateFormGroup.getRawValue().description || '' })
      .subscribe((res) => {
        this.formGroup.patchValue(res);
      });
  }

  readonly formGroup = new FormGroup({
    title: new FormControl<Post['title']>('', [Validators.required]),
    content: new FormControl<Post['content']>('', [Validators.required]),
    image: new FormControl<string>('', [Validators.required]), // GeneratePostDto['image']
  });

  save() {
    this.postsStore.createPost(this.formGroup.getRawValue() as unknown as Post);
  }
}
