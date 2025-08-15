import { CookieService } from 'ngx-cookie-service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GalleriaModule } from 'primeng/galleria';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ImagesComponent } from './images.component';
import { ImagesRoutingModule } from './images-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { HideImageDirective } from 'src/app/directives/hideimagedirective';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageRequestInterceptor } from 'src/app/interception/image.interceptor';
import { ImagemService } from 'src/app/services/imagem.service';

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    ToastModule,
    FileUploadModule,
    GalleriaModule,
    ProgressBarModule,
    GalleriaModule,
    ImageModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, ImagemService, {provide: HTTP_INTERCEPTORS, useClass: ImageRequestInterceptor, multi: true}]
})
export class ImagesModule { }
