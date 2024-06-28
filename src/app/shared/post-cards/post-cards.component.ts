import { Component, Input, OnChanges, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../post.model';
import { PostCardsService } from './post-cards.service';
import { SortOption } from '../sort-by/sort-option';

@Component({
  selector: 'app-post-cards[initialData]',
  templateUrl: './post-cards.component.html',
  styleUrls: ['./post-cards.component.scss'],
  providers: [PostCardsService],
})
export class PostCardsComponent implements OnChanges {
  @Input() initialData!: Post[] | null;

  private postCardsService = inject(PostCardsService);

  data$: Observable<Post[]> | null = this.postCardsService.data$;

  currentSortProperty$: Observable<keyof Post | null> = this.postCardsService.currentSortProperty$;

  lastPage = 1;

  sortOptions: SortOption<Post>[] = [
    { value: 'authorName', label: 'Name' },
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Country' },
    { value: 'upvotes', label: 'Upvotes' },
    { value: 'date', label: 'Date' },
  ];

  ngOnChanges(): void {
    if (this.initialData) {
      this.postCardsService.setInitialData(this.initialData);
      this.lastPage = Math.floor(this.initialData.length / 5);
    }
  }

  onPageChange(page: number): void {
    this.postCardsService.setCurrentPage(page);
  }

  onSortChange(option: SortOption<Post>): void {
    this.postCardsService.sortData(option.value);
  }

  onResetSort(e: MouseEvent): void {
    e.stopImmediatePropagation();
    this.postCardsService.resetSort();
  }
}
