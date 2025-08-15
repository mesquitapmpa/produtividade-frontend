import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitComponent } from './init.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InitComponent }
	])],
	exports: [RouterModule]
})
export class InitRoutingModule { }


