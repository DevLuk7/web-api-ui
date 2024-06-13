import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CMSService } from '../data-access/cms.service';
import { MarkdownPipe } from '../utils/markdown.pipe';
import { Meta } from '@angular/platform-browser';
import { first, shareReplay } from 'rxjs';
import { CMSUrlPipe } from '../utils/cms-url.pipe';
import { config } from '../app.config';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MarkdownPipe, CMSUrlPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  readonly paramSlug = inject(ActivatedRoute).snapshot.params?.['slug'];
  readonly post$ = inject(CMSService).getPost(this.paramSlug).pipe(shareReplay(1));
  
  private readonly meta = inject(Meta);

  constructor() {
    this.post$.pipe(first()).subscribe(post => {
      this.meta.updateTag({ property: 'og:title', content: post.attributes.title });
      this.meta.updateTag({ property: 'og:description', content: post.attributes.content });
      this.meta.updateTag({ property: 'og:url', content:  `${config().appUrl}/${post.attributes.slug}` });
      this.meta.updateTag({ property: 'og:image', content: new CMSUrlPipe().transform(post.attributes.image.data.attributes.url) });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ property: 'og:site_name', content: config().appUrl });
    });
  }
}
