import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
})
export class LoginModule { }
