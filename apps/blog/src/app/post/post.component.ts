import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '@web-api-ui/web-api';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  readonly paramsId = inject(ActivatedRoute).snapshot.params?.['id'];
  readonly post$ = inject(PostsService).postsControllerGet(this.paramsId);
}
