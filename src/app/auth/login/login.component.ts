import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthRequest } from 'src/app/models/auth';
import { LoginService } from 'src/app/services/login.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnDestroy {

  private destroy$ = new Subject<void>()

  isLoading = false
  loginForm = this.formBuilder.group(
    {
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router) {}


  onSubmitLoginForm(): void {

    //console.log('DADOS DO FORMULÁRIO DE LOGIN', this.loginForm.value)
    this.loginForm.value.senha = Md5.hashAsciiStr(this.loginForm.value.senha!)
    //console.log(this.loginForm.value.senha)
    if (this.loginForm.value && this.loginForm.valid) {
      this.isLoading = true
      this.loginService.authUser(this.loginForm.value as AuthRequest)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
          next: (response) => {
            if (response) {
              //console.log(response)
              this.cookieService.set('TOKEN', response?.token)
              this.cookieService.set('X-Token', response?.xtoken)
              this.cookieService.set('unidade', response?.unidade.toString())
              this.loginForm.reset()
              this.router.navigate(['/app/home'])
              this.isLoading = false
            }
          },
          error: (err) => {
            if (err.status == 404) {
              this.messageService.add({
                severity: 'error',
                summary: 'LOGIN OU SENHA INCORRETOS',
                detail: err.status,
                life: 3000
              })
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'error ao fazer login',
                detail: err.status,
                life: 3000
              })
            }

            this.isLoading = false
            console.log(err)}
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
