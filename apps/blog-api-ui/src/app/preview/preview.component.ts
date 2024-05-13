import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Post, PostsService } from '@web-api-ui/web-api';
import { EMPTY, Observable } from 'rxjs';
import { getRouteParam } from '../utils/route-params';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  private readonly id = getRouteParam('id');
  private readonly postService = inject(PostsService);
  post$: Observable<Post> = EMPTY;

  ngOnInit(): void {
    this.post$ = this.postService.postsControllerGet(this.id);
  }
}
