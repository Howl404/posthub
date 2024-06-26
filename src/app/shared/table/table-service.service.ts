import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);

  data$ = this.dataSubject.asObservable();

  private currentSortProperty: keyof T | null = null;

  private sortDirection: 'asc' | 'desc' = 'asc';

  setInitialData(initialData: T[]): void {
    this.dataSubject.next(initialData);
  }

  sortData(property: keyof T): void {
    const currentData = this.dataSubject.getValue();

    if (this.currentSortProperty === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortProperty = property;
      this.sortDirection = 'asc';
    }

    currentData.sort((a, b) => {
      if (a[property] < b[property]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[property] > b[property]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.dataSubject.next(currentData);
  }
}
