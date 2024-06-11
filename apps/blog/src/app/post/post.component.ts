import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CMSService } from '../data-access/cms.service';
import { MarkdownPipe } from '../utils/markdown.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MarkdownPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  readonly paramSlug = inject(ActivatedRoute).snapshot.params?.['slug'];
  readonly post$ = inject(CMSService).getPost(this.paramSlug);
}
