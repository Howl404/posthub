import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SortDirection } from './sort-direction.enum';
import { TableHeader } from './table-header.model';
import { TableService } from './table-service.service';

@Component({
  selector: 'app-table[headers][initialData]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends object> implements OnInit {
  @Input() headers!: TableHeader<T>[];

  @Input() initialData!: T[];

  private tableService = inject(TableService<T>);

  data: Observable<T[]> = this.tableService.data$;

  currentSortProperty: Observable<keyof T | null> = this.tableService.currentSortProperty$;

  sortDirection: Observable<SortDirection> = this.tableService.sortDirection$;

  ngOnInit(): void {
    this.tableService.setInitialData(this.initialData);
  }

  onHeaderClick(property: keyof T): void {
    this.tableService.sortData(property);
  }

  onResetSort(e: MouseEvent): void {
    e.stopImmediatePropagation();
    this.tableService.resetSort();
  }
}
