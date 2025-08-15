import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { DashboardComponent } from '../dashboards/dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
