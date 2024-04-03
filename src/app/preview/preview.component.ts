import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Post, PostService } from '../api';
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
  private readonly postService = inject(PostService);
  post$: Observable<Post> = EMPTY;

  ngOnInit(): void {
    this.post$ = this.postService.apiPostIdGet(this.id);
  }
}
