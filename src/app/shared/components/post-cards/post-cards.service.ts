import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostCardsService {
  currentPage = 1;

  itemsPerPage = 5;

  private initialData: Post[] | undefined;

  private fullData: Post[] | null = null;

  private readonly dataSubject = new BehaviorSubject<Post[] | null>(null);

  private readonly currentSortPropertySubject = new BehaviorSubject<keyof Post | null>(null);

  readonly data$: Observable<Post[]> | null = this.dataSubject.asObservable();

  readonly currentSortProperty$: Observable<keyof Post | null> =
    this.currentSortPropertySubject.asObservable();

  setInitialData(initialData: Post[] | null): void {
    if (!initialData) return;

    this.initialData = [...initialData];
    this.fullData = [...initialData];
    this.updatePaginatedData();
  }

  sortData(property: keyof Post): void {
    if (!this.initialData) return;

    this.currentSortPropertySubject.next(property);

    this.fullData.sort((a, b) => {
      if (a[property] < b[property]) return 1;
      if (a[property] > b[property]) return -1;
      return 0;
    });

    this.updatePaginatedData();
  }

  resetSort(): void {
    if (!this.initialData) return;

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
