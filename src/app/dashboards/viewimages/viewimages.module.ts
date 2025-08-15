import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewimagesComponent } from './viewimages.component';
import { ViewImagesRoutingModule } from './viewimages-routing.module';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ViewimagesComponent
  ],
  imports: [
    CommonModule,
    ViewImagesRoutingModule,
    GalleriaModule,
    ImageModule,
    ButtonModule

  ]
})
export class ViewimagesModule { }
