import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoRegistroComponent } from './novo.registro.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', data: {breadcrumb: 'Novo'}, component: NovoRegistroComponent },
	])],
	exports: [RouterModule]
})
export class NovoRegistroRoutingModule { }
