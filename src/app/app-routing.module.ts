import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard as AuthAdminGuard } from './guards/auth-admin.guard';

import { AuthGuard as AuthNinosGuard } from './guards/auth-ninos.guard';

import { HomePageComponent } from './home/home-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    title: 'El Río Iglesia | Portal Niños'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'ninos',
    loadChildren: () => import('./ninos/ninos.module').then((m) => m.NinosModule),
    canActivate: [AuthNinosGuard],
    canLoad: [AuthNinosGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthAdminGuard],
    canLoad: [AuthAdminGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
