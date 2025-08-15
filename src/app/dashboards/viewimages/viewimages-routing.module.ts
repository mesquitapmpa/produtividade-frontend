import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewimagesComponent } from './viewimages.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ViewimagesComponent }
	])],
	exports: [RouterModule]
})
export class ViewImagesRoutingModule { }
