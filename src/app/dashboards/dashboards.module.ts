import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { InitComponent } from './init/init.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardsRoutingModule,

    ],
    declarations: [
    InitComponent
  ]
})
export class DashboardsModule { }
