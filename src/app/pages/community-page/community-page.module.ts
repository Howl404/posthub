import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityPageComponent } from './community-page.component';
import { CommunityPageRoutingModule } from './community-page-routing.module';
import { SharedModule } from '../../shared/shared-module.module';

@NgModule({
  declarations: [CommunityPageComponent],
  imports: [CommonModule, SharedModule, CommunityPageRoutingModule],
  exports: [CommunityPageComponent],
})
export class CommunityPageModule {}
