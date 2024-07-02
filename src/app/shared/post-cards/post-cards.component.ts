import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
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

  lastPage = 1;

  sortOptions: SortOption<Post>[] = [
    { value: 'authorName', label: 'Name' },
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Country' },
    { value: 'upvotes', label: 'Upvotes' },
    { value: 'date', label: 'Date' },
  ];

  private readonly postCardsService = inject(PostCardsService);

  readonly data$: Observable<Post[]> | null = this.postCardsService.data$;

  readonly currentSortProperty$: Observable<keyof Post | null> =
    this.postCardsService.currentSortProperty$;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']) {
      const { currentValue } = changes['initialData'];

      this.postCardsService.setInitialData(currentValue);
      this.lastPage = Math.ceil(currentValue.length / this.postCardsService.itemsPerPage);
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

  trackById(index: number, post: Post): string {
    return post.id;
  }
}
