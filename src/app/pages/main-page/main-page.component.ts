import { Component } from '@angular/core';
import { SortOption } from 'src/app/shared/sort-by/sort-option';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  sortOptions: SortOption[] = [
    { value: 'name', label: 'Name' },
    { value: 'country', label: 'Country' },
    { value: 'population', label: 'Population' },
    { value: 'area_km2', label: 'Area (km²)' },
    { value: 'founded', label: 'Founded' },
  ];
}
