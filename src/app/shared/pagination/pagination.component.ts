import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination[lastPage]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() initialPage = 1;

  @Input() lastPage!: number;

  @Output() pageChange = new EventEmitter<number>();

  currentPage = this.initialPage;

  nextPage(): void {
    this.currentPage++;
    this.pageChange.emit(this.currentPage);
  }

  prevPage(): void {
    this.currentPage--;
    this.pageChange.emit(this.currentPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
