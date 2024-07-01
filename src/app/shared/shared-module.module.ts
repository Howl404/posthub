import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { PostCardsComponent } from './post-cards/post-cards.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { TableComponent } from './table/table.component';
import { ViewSwitcherComponent } from './view-switcher/view-switcher.component';
import { ModalComponent } from './modal/modal.component';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';

@NgModule({
  declarations: [
    PaginationComponent,
    PostCardsComponent,
    SortByComponent,
    TableComponent,
    ViewSwitcherComponent,
    ModalComponent,
    DynamicFormFieldComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    PaginationComponent,
    PostCardsComponent,
    SortByComponent,
    TableComponent,
    ViewSwitcherComponent,
    ModalComponent,
    DynamicFormFieldComponent,
  ],
})
export class SharedModule {}
