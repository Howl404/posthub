import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostCardsComponent } from './components/post-cards/post-cards.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { TableComponent } from './components/table/table.component';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { ModalComponent } from './components/modal/modal.component';
import { DynamicFormFieldComponent } from './components/dynamic-form-field/dynamic-form-field.component';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { CommentComponent } from '../pages/community-page/post-page/comment/comment.component';
import { UpvoteComponent } from '../pages/community-page/post-page/upvote/upvote.component';
import { EditPostModalComponent } from '../pages/community-page/post-page/edit-post-modal/edit-post-modal.component';
import { NotFoundModalComponent } from './components/not-found-modal/not-found-modal.component';

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
    CommentComponent,
    UpvoteComponent,
    EditPostModalComponent,
    NotFoundModalComponent,
  ],
  imports: [CommonModule, FormsModule, MatIconModule, RouterLink, NgxEchartsModule.forChild()],
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
    CommentComponent,
    UpvoteComponent,
    EditPostModalComponent,
    NotFoundModalComponent,
  ],
})
export class SharedModule {}
