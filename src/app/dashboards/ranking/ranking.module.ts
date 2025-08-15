import { SkeletonModule } from 'primeng/skeleton';
import { IndexOfPipe } from 'src/app/directives/Indexofpipe';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { RankingRoutingModule } from './ranking-routing.module';
import { RankingService } from 'src/app/services/ranking.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardTableComponent } from './card-table/card-table.component';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from 'src/app/interception/request.interceptor';

@NgModule({
  declarations: [
    RankingComponent, IndexOfPipe, CardTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RankingRoutingModule,
    DataViewModule,
    InputTextModule,
		DropdownModule,
    ButtonModule,
    CalendarModule,
    SidebarModule,
    SkeletonModule,
    DialogModule,
    TableModule,

  ],
  providers: [DataViewLayoutOptions, {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}]

})
export class RankingModule { }
