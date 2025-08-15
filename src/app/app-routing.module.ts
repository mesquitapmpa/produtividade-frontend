import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';

const routes: Routes = [
  {
    path: 'app',component: AppLayoutComponent,
      children: [
        {path: '', data: { breadcrumb: 'App' }, loadChildren: () => import('src/app/dashboards/dashboards.module').then((m) => m.DashboardsModule)}
    ]},
    {path: '', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
