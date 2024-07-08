import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../../../shared/shared-module.module';
import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';

@NgModule({
  declarations: [PostPageComponent],
  imports: [
    NgxEchartsModule.forChild(),
    CommonModule,
    SharedModule,
    FormsModule,
    PostPageRoutingModule,
  ],
  exports: [PostPageComponent],
})
export class PostPageModule {}
