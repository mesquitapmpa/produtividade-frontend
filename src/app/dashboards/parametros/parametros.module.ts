import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrosComponent } from './parametros.component';
import { ParametrosRoutingModule } from './parametros-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ParametroService } from 'src/app/services/parametro.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [
    ParametrosComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    TableModule,
		FileUploadModule,
		FormsModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		InputTextModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
    ButtonModule,
    InputSwitchModule
  ],
  providers: []
})
export class ParametrosModule { }
