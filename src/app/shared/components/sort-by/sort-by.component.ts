import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SortOption } from './sort-option';

@Component({
  selector: 'app-sort-by[options]',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
})
export class SortByComponent<T extends object> {
  @Input() options!: SortOption<T>[];

  @Output() selected = new EventEmitter<SortOption<T>>();

  isDropdownOpen = false;

  selectedLabel = 'Sort By';

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onOptionSelect(option: SortOption<T>): void {
    this.selectedLabel = option.label;
    this.selected.emit(option);
    this.isDropdownOpen = false;
  }
}
