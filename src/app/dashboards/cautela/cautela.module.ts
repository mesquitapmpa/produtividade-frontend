import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CautelaComponent } from './cautela.component';
import { CautelaRoutingModule } from './cautela-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';


@NgModule({
  declarations: [
    CautelaComponent
  ],
  imports: [
    CommonModule,
    CautelaRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    AvatarModule,
    ToolbarModule,
    SplitButtonModule
  ]
})
export class CautelaModule { }
