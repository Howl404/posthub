import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { SortOption } from './sort-option';

@Component({
  selector: 'app-sort-by[options]',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
})
export class SortByComponent<T extends object> implements OnChanges {
  @Input() options!: SortOption<T>[];

  @Input() initialSortProperty!: keyof T | undefined;

  @Output() selected = new EventEmitter<SortOption<T>>();

  isDropdownOpen = false;

  selectedLabel = 'Sort By';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialSortProperty']) {
      const { currentValue } = changes['initialSortProperty'];

      const option = this.options.find((opt) => opt.value === currentValue);
      this.onOptionSelect(option);
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onOptionSelect(option: SortOption<T>): void {
    this.selectedLabel = option.label;
    this.selected.emit(option);
    this.isDropdownOpen = false;
  }
}
