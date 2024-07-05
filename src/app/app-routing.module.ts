import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'r/:name',
    loadChildren: () =>
      import('./pages/community-page/community-page.module').then((m) => m.CommunityPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
