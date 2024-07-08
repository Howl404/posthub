import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPageComponent } from './community-page.component';

const routes: Routes = [
  {
    path: ':postId',
    loadChildren: () => import('./post-page/post-page.module').then((m) => m.PostPageModule),
  },
  {
    path: '',
    component: CommunityPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageRoutingModule {}
