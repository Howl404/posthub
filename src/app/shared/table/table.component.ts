import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SortDirection } from './sort-direction.enum';
import { TableHeader } from './table-header.model';
import { TableService } from './table-service.service';

@Component({
  selector: 'app-table[headers][initialData]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService],
})
export class TableComponent<T extends object> implements OnChanges {
  @Input() headers!: TableHeader<T>[];

  @Input() initialData!: T[] | null;

  lastPage = 1;

  private readonly tableService = inject(TableService<T>);

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
}
