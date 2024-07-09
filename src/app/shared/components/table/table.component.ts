import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SortDirection } from './sort-direction.enum';
import { TableHeader } from './table-header.model';
import { TableService } from './table-service.service';
import { CommunitiesService } from '../../services/communities.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-table[headers][initialData]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService],
})
export class TableComponent<T extends object> implements OnChanges {
  @Input() initialSortProperty!: keyof T;

  @Input() headers!: TableHeader<T>[];

  @Input() initialData!: T[] | null;

  lastPage = 1;

  private readonly tableService = inject(TableService<T>);

  private readonly router = inject(Router);

  private readonly communitiesService = inject(CommunitiesService);

  readonly data$: Observable<T[]> | null = this.tableService.data$;

  readonly currentSortProperty$: Observable<keyof T | null> =
    this.tableService.currentSortProperty$;

  readonly sortDirection$: Observable<SortDirection> = this.tableService.sortDirection$;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']) {
      const { currentValue } = changes['initialData'];

      this.tableService.setInitialData(currentValue);
      this.lastPage = Math.ceil(currentValue.length / this.tableService.itemsPerPage) || 1;
    }

    if (changes['initialSortProperty']) {
      const { currentValue } = changes['initialSortProperty'];

      this.tableService.sortData(currentValue);
    }
  }

  onPageChange(page: number): void {
    this.tableService.setCurrentPage(page);
  }

  onHeaderClick(property: keyof T): void {
    this.tableService.sortData(property);
  }

  onResetSort(e: MouseEvent): void {
    e.stopImmediatePropagation();
    this.tableService.resetSort();
  }

  onRowClick(row: T): void {
    const post = row as Post;
    if (post.id && post.location) {
      this.communitiesService
        .getCommunityById(post.location)
        .pipe(first())
        .subscribe((community) => {
          const communityName = community?.name ?? '';
          this.router.navigate(['/r/', communityName, post.id]);
        });
    }
  }
}
