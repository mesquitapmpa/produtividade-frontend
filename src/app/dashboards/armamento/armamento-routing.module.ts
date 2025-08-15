import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArmamentoService } from 'src/app/services/armamento.service';
import { CookieService } from 'ngx-cookie-service';
import { ArmamentoComponent } from './armamento.component';
import { ImagesComponent } from '../images/images.component';
import { ArmamentosDataTransferService } from 'src/app/services/armamentos-data-transfer.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', data: { breadcrumb: 'Novo' }, component: ArmamentoComponent},
      { path: 'imagens/:id', data: {breadcrumb: 'Imagens'}, component: ImagesComponent },

    ]),
  ],
  exports: [RouterModule],
  providers: [ArmamentoService, CookieService, ArmamentosDataTransferService],
})
export class ArmamentoRoutingModule {}
