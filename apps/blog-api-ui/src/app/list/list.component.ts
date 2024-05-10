import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  RowClickedEvent,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from 'ag-grid-community';
import { PostsStore } from '../data-access/posts.store';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly posts = inject(PostsStore).posts;
  private readonly router = inject(Router);

  public autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
    columnLimits: [
      {
        colId: 'country',
        minWidth: 900,
      },
    ],
  };

  readonly colDefs: ColDef[] = [{ field: 'id', valueGetter: ({ data }) => data._id }, { field: 'title' }];

  onRowClicked(e: RowClickedEvent) {
    this.router.navigate(['preview', e.data._id]);
  }
}
