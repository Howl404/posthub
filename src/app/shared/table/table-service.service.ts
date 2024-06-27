import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortDirection } from './sort-direction.enum';

@Injectable({
  providedIn: 'root',
})
export class TableService<T> {
  initialData: T[] | undefined;

  private dataSubject = new BehaviorSubject<T[]>([]);

  private currentSortPropertySubject = new BehaviorSubject<keyof T | null>(null);

  private sortDirectionSubject = new BehaviorSubject<SortDirection>(SortDirection.asc);

  data$: Observable<T[]> = this.dataSubject.asObservable();

  currentSortProperty$: Observable<keyof T | null> = this.currentSortPropertySubject.asObservable();

  sortDirection$: Observable<SortDirection> = this.sortDirectionSubject.asObservable();

  setInitialData(initialData: T[]): void {
    this.initialData = initialData;
    this.dataSubject.next([...initialData]);
  }

  sortData(property: keyof T): void {
    const currentData = this.dataSubject.getValue();

    const currentSortProperty = this.currentSortPropertySubject.getValue();
    let sortDirection = this.sortDirectionSubject.getValue();

    if (currentSortProperty === property) {
      sortDirection = sortDirection ? SortDirection.asc : SortDirection.desc;
      this.sortDirectionSubject.next(sortDirection);
    } else {
      this.currentSortPropertySubject.next(property);
      this.sortDirectionSubject.next(SortDirection.asc);
    }

    currentData.sort((a, b) => {
      if (a[property] < b[property]) return sortDirection ? 1 : -1;
      if (a[property] > b[property]) return sortDirection ? -1 : 1;
      return 0;
    });

    this.dataSubject.next(currentData);
  }

  resetSort(): void {
    if (this.initialData) {
      this.sortDirectionSubject.next(SortDirection.asc);
      this.currentSortPropertySubject.next(null);
      this.dataSubject.next([...this.initialData]);
    }
  }
}