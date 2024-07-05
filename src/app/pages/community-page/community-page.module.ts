import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommunityPageComponent } from './community-page.component';
import { CommunityPageRoutingModule } from './community-page-routing.module';
import { SharedModule } from '../../shared/shared-module.module';
import { NotFoundModalComponent } from './components/not-found-modal/not-found-modal.component';
import { CreatePostModalComponent } from './components/create-post-modal/create-post-modal.component';
import { EditCommunityModalComponent } from './components/edit-community-modal/edit-community-modal.component';
import { PostPageComponent } from './post-page/post-page.component';

@NgModule({
  declarations: [
    CommunityPageComponent,
    NotFoundModalComponent,
    CreatePostModalComponent,
    EditCommunityModalComponent,
    PostPageComponent,
  ],
  imports: [
    NgxEchartsModule.forChild(),
    CommonModule,
    SharedModule,
    FormsModule,
    CommunityPageRoutingModule,
  ],
  exports: [CommunityPageComponent],
})
export class CommunityPageModule {}
