import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'r/:name',
    loadChildren: () =>
      import('./pages/community-page/community-page.module').then((m) => m.CommunityPageModule),
  },
  {
    path: 'u/:name',
    loadChildren: () =>
      import('./pages/profile-page/profile-page.module').then((m) => m.ProfilePageModule),
  },
  {
    path: '',
    loadChildren: () => import('./pages/main-page/main-page.module').then((m) => m.MainPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
