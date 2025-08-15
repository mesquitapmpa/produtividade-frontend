import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParametrosComponent } from './parametros.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', data: {breadcrumb: 'Novo'},component: ParametrosComponent }
	])],
	exports: [RouterModule]
})
export class ParametrosRoutingModule { }
