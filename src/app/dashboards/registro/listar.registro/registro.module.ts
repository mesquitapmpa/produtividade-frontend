
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { HideMissingDirective } from 'src/app/directives/hidemissingdirective';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';


@NgModule({
  declarations: [ RegistroComponent, HideMissingDirective],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    TableModule,
		FormsModule,
    ReactiveFormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    CardModule,
    CalendarModule,
    EditorModule,
    MultiSelectModule,
    PickListModule,
    CheckboxModule,
    SelectButtonModule,
    InputTextareaModule,
    AvatarGroupModule,
    AvatarModule

  ],
  providers: []
})
export class RegistroModule { }
