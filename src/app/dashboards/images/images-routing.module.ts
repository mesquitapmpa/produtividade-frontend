import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArmamentoService } from 'src/app/services/armamento.service';
import { CookieService } from 'ngx-cookie-service';
import { ImagesComponent } from './images.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', data: { breadcrumb: 'Selecionar' }, component: ImagesComponent},
    ]),
  ],
  exports: [RouterModule],
  providers: [ArmamentoService, CookieService],
})
export class ImagesRoutingModule {}
