import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPageComponent } from './community-page.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityPageComponent,
  },
  {
    path: ':postId',
    component: PostPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageRoutingModule {}
