import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArmamentoService } from 'src/app/services/armamento.service';
import { CookieService } from 'ngx-cookie-service';
import { CautelaComponent } from './cautela.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', data: { breadcrumb: 'Novo' }, component: CautelaComponent},
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class CautelaRoutingModule {}
