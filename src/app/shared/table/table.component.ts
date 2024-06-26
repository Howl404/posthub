import { Component, Input, OnInit, inject } from '@angular/core';
import { TableHeader } from 'src/app/shared/table/table-header.model';
import { TableService } from 'src/app/shared/table/table-service.service';

@Component({
  selector: 'app-table[headers][initialData]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends object> implements OnInit {
  @Input() headers!: TableHeader<T>[];

  @Input() initialData!: T[];

  data: T[] = [];

  currentSortProperty: keyof T | null = null;

  sortDirection: 'asc' | 'desc' = 'asc';

  private tableService = inject(TableService);

  ngOnInit(): void {
    this.tableService.setInitialData(this.initialData);

    this.tableService.data$.subscribe((data) => {
      this.data = data;
    });
  }

  onHeaderClick(property: keyof T): void {
    this.tableService.sortData(property);
    if (this.currentSortProperty === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortProperty = property;
      this.sortDirection = 'asc';
    }
  }

  isSorted(property: keyof T): boolean {
    return this.currentSortProperty === property;
  }
}
