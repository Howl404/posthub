import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  currentSortProperty = this.tableService.currentSortProperty$;

  sortDirection = this.tableService.sortDirection$;

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
