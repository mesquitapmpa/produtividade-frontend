import { ChipModule } from 'primeng/chip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoRegistroComponent } from './novo.registro.component';
import { NovoRegistroRoutingModule } from './novo.registro-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    NovoRegistroComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    NovoRegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule,
    ButtonModule,
    EditorModule,
    FileUploadModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    ChipModule,
    InputSwitchModule
  ]
})
export class NovoRegistroModule { }
