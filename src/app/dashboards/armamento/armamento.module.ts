import { AvatarGroupModule } from 'primeng/avatargroup';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmamentoRoutingModule } from './armamento-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ArmamentoComponent } from './armamento.component';
import { AvatarModule } from 'primeng/avatar';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [ArmamentoComponent],
  imports: [
    CommonModule,
    ArmamentoRoutingModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: []
})
export class ArmamentoModule { }
