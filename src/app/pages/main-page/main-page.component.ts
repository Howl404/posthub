import { Component } from '@angular/core';
import { TableHeader } from '../../shared/table/table-header.model';
import { SortOption } from '../../shared/sort-by/sort-option';

export interface CityData {
  name: string;
  country: string;
  population: number;
  area_km2: number;
  founded: string;
}
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

  headers: TableHeader<CityData>[] = [
    { value: 'Name', propertyKey: 'name' },
    { value: 'Country', propertyKey: 'country' },
    { value: 'Population', propertyKey: 'population' },
    { value: 'Area (km²)', propertyKey: 'area_km2' },
    { value: 'Founded', propertyKey: 'founded' },
  ];

  data: CityData[] = [
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      population: 37435191,
      area_km2: 2194,
      founded: '1457 AD',
    },
    {
      name: 'New York City',
      country: 'United States',
      population: 8419600,
      area_km2: 783.8,
      founded: '1624 AD',
    },
    {
      name: 'Paris',
      country: 'France',
      population: 2140526,
      area_km2: 105.4,
      founded: '3rd century BC',
    },
  ];
}
