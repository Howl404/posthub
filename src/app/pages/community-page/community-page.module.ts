import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityPageComponent } from './community-page.component';
import { CommunityPageRoutingModule } from './community-page-routing.module';
import { SharedModule } from '../../shared/shared-module.module';
import { CreatePostModalComponent } from './components/create-post-modal/create-post-modal.component';
import { EditCommunityModalComponent } from './components/edit-community-modal/edit-community-modal.component';

@NgModule({
  declarations: [CommunityPageComponent, CreatePostModalComponent, EditCommunityModalComponent],
  imports: [CommonModule, SharedModule, FormsModule, CommunityPageRoutingModule],
  exports: [CommunityPageComponent],
})
export class CommunityPageModule {}
