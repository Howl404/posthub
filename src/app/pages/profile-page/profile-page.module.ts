import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { SharedModule } from '../../shared/shared-module.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [ProfilePageRoutingModule, CommonModule, SharedModule],
  exports: [ProfilePageComponent],
})
export class ProfilePageModule {}
