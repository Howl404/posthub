import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SortOption } from './sort-option';

@Component({
  selector: 'app-sort-by[options]',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
})
export class SortByComponent {
  @Input() options!: SortOption[];

  @Output() selected = new EventEmitter<string>();

  isDropdownOpen = false;

  selectedLabel = 'Sort By';

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onOptionSelect(option: SortOption): void {
    this.selectedLabel = option.label;
    this.selected.emit(option.value);
    this.isDropdownOpen = false;
  }
}
