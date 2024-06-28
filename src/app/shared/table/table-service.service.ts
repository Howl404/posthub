import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortDirection } from './sort-direction.enum';

@Injectable({
  providedIn: 'root',
})
export class TableService<T> {
  currentPage = 1;

  itemsPerPage = 5;

  private initialData: T[] | undefined;

  private fullData: T[] | null = null;

  private readonly dataSubject = new BehaviorSubject<T[] | null>(null);

  private readonly currentSortPropertySubject = new BehaviorSubject<keyof T | null>(null);

  private readonly sortDirectionSubject = new BehaviorSubject<SortDirection>(SortDirection.asc);

  readonly data$: Observable<T[]> | null = this.dataSubject.asObservable();

  readonly currentSortProperty$: Observable<keyof T | null> =
    this.currentSortPropertySubject.asObservable();

  readonly sortDirection$: Observable<SortDirection> = this.sortDirectionSubject.asObservable();

  setInitialData(initialData: T[] | null): void {
    if (!initialData) return;

    this.initialData = [...initialData];
    this.fullData = [...initialData];
    this.updatePaginatedData();
  }

  sortData(property: keyof T): void {
    if (!this.initialData) return;

    const currentSortProperty = this.currentSortPropertySubject.getValue();
    let sortDirection = this.sortDirectionSubject.getValue();

    if (currentSortProperty === property) {
      sortDirection = sortDirection ? SortDirection.asc : SortDirection.desc;
      this.sortDirectionSubject.next(sortDirection);
    } else {
      this.currentSortPropertySubject.next(property);
      this.sortDirectionSubject.next(SortDirection.asc);
    }

    this.fullData.sort((a, b) => {
      if (a[property] < b[property]) return sortDirection ? 1 : -1;
      if (a[property] > b[property]) return sortDirection ? -1 : 1;
      return 0;
    });

    this.updatePaginatedData();
  }

  resetSort(): void {
    if (!this.initialData) return;

    this.sortDirectionSubject.next(SortDirection.asc);
    this.currentSortPropertySubject.next(null);
    this.fullData = [...this.initialData];
    this.updatePaginatedData();
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  setItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
    if (!this.initialData) return;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedData = this.fullData.slice(startIndex, endIndex);

    this.dataSubject.next(paginatedData);
  }
}
