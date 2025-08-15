import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';
import { HomeService } from 'src/app/services/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { AbordagensComponent } from './components/abordagens/abordagens.component';
import { GraphAveriguacoesComponent } from './components/graph-averiguacoes/graph-averiguacoes.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ListPercentualPipe } from 'src/app/directives/listpercentual';
import { BadgeModule } from 'primeng/badge';
import { ListRankingComponent } from './components/list-ranking/list-ranking.component';
import { GraphDataTransferService } from 'src/app/services/graph-data-transfer.service';


@NgModule({
  declarations: [
    HomeComponent,
    AbordagensComponent,
    GraphAveriguacoesComponent,
    ListPercentualPipe,
    ListRankingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ChartModule,
    ToolbarModule,
    AvatarModule,
    BadgeModule,
    CarouselModule

  ],
  providers: []
})
export class HomeModule { }
