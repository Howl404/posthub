import { Component, Input, OnChanges, inject } from '@angular/core';
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

  private tableService = inject(TableService<T>);

  data$: Observable<T[]> | null = this.tableService.data$;

  currentSortProperty$: Observable<keyof T | null> = this.tableService.currentSortProperty$;

  sortDirection$: Observable<SortDirection> = this.tableService.sortDirection$;

  lastPage = 1;

  ngOnChanges(): void {
    if (this.initialData) {
      this.tableService.setInitialData(this.initialData);
      this.lastPage = Math.floor(this.initialData.length / 5);
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
