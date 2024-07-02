import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityPageComponent } from './community-page.component';
import { CommunityPageRoutingModule } from './community-page-routing.module';
import { SharedModule } from '../../shared/shared-module.module';
import { NotFoundModalComponent } from './not-found-modal/not-found-modal.component';
import { CreatePostModalComponent } from './create-post-modal/create-post-modal.component';

@NgModule({
  declarations: [CommunityPageComponent, NotFoundModalComponent, CreatePostModalComponent],
  imports: [CommonModule, SharedModule, FormsModule, CommunityPageRoutingModule],
  exports: [CommunityPageComponent],
})
export class CommunityPageModule {}
