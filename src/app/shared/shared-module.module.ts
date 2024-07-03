import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostCardsComponent } from './components/post-cards/post-cards.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { TableComponent } from './components/table/table.component';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { ModalComponent } from './components/modal/modal.component';
import { DynamicFormFieldComponent } from './components/dynamic-form-field/dynamic-form-field.component';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [
    PaginationComponent,
    PostCardsComponent,
    SortByComponent,
    TableComponent,
    ViewSwitcherComponent,
    ModalComponent,
    DynamicFormFieldComponent,
    LoadingBlockComponent,
    TimeAgoPipe,
  ],
  imports: [CommonModule, FormsModule, MatIconModule],
  exports: [
    PaginationComponent,
    PostCardsComponent,
    SortByComponent,
    TableComponent,
    ViewSwitcherComponent,
    ModalComponent,
    DynamicFormFieldComponent,
    LoadingBlockComponent,
    TimeAgoPipe,
    MatIconModule,
  ],
})
export class SharedModule {}
