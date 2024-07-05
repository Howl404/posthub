import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../../shared/shared-module.module';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, SharedModule, MainPageRoutingModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
