import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { FileProgressEvent, FileUpload } from 'primeng/fileupload';
import {
  Subject,
  Subscription,
  catchError,
  map,
  takeUntil,
  throwError,
} from 'rxjs';
import prettyBytes from 'pretty-bytes';
import {
  FileUploadModel,
  FileUploadService,
} from 'src/app/services/file-upload.service';
import { ArmamentoDataTransferService } from 'src/app/services/armamento-data-transfer.service';
import { ProgressBar } from 'primeng/progressbar';
import { environment } from 'src/app/environments/environment';
import { ImagemService } from 'src/app/services/imagem.service';
import { Imagem } from 'src/app/models/armamento';
import { PhotoService } from 'src/app/services/photo.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface Image {
  name: string;
  objectURL: string;
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit, AfterViewInit {
  @ViewChild('primeFileUpload') primeFileUpload!: FileUpload;
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  @ViewChild('progressBarFileUpload') progressBarFileUpload!: ProgressBar;

  private destroy$ = new Subject<void>(); // !memoryleak
  progress: number = 0;
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  registro: any = {};
  deletelfileUpload?: FileUploadModel;
  deleteRegistroDialog = false;
  loadingDelete = false;
  totalPercent = 0;
  percentDone?: number | undefined;
  id?: string;
  uploadedFiles: any[] = [];
  images: Image[] = [];
  selectedFiles?: any;
  currentFileUpload?: FileUploadModel;
  send: boolean = false;
  fileUploads: any[] = []
  percentDonePerFile?: number | undefined;
  EXCLUIR_TXT = environment.EXCLUIR_TXT;
  URL = environment.API_URL_TEST;
  model = '';
  uploadProgress?: Subscription;

  listImages: any[] | undefined;

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(newValue) {
    if (this.fileUploads && 0 <= newValue && newValue <= this.fileUploads.length - 1) {
      this._activeIndex = newValue;
    }
  }

  _activeIndex: number = 2;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private imagemService: ImagemService
  ) {}

  ngAfterViewInit(): void {
    //console.log(this.armamentoDTransferService.getArmamentosData())
    //this.registro = this.armamentoDTransferService.getArmamentosData()
    //console.log(this.registro);
  }

  isRemove(){
    this.deleteRegistroDialog = true
    console.log(this._activeIndex)
    console.log(this.fileUploads[this._activeIndex])
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.model = this.route.snapshot.params['model'];
    console.log(this.id);
    //this.photoService.getImages().then((images) => (this.listImages = images));
    this.loadImages(this.id!, this.model);
  }

  next() {
    this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }

  onImageMouseOver(file: Image) {
    this.buttonEl.toArray().forEach((el) => {
      el.nativeElement.id === file.name
        ? (el.nativeElement.style.display = 'flex')
        : null;
    });
  }

  onImageMouseLeave(file: Image) {
    this.buttonEl.toArray().forEach((el) => {
      el.nativeElement.id === file.name
        ? (el.nativeElement.style.display = 'none')
        : null;
    });
  }

  removeImage(file: Image) {
    //this.registro.images = this.registro.images!.filter((i) => i !== file);

    this.buttonEl.toArray().forEach((el) => {
      if (el.nativeElement.id === file.name) {
        const index = this.images?.indexOf(file);
        this.images?.splice(index!, 1);
        this.selectedFiles?.splice(index!, 1);
      }
    });
  }

  formtSize(selectedFiles: any[] ) {
    let total = 0

    selectedFiles.forEach( file => {
      total += file.size

    })
    return prettyBytes(total);
  }

  /*fileUpload($event: any) {
    if ($event && $event.files) {
      for (const file of $event.files) {
        //const file: File | null = this.selectedFiles[0];
        this.selectedFiles = undefined;

        if (file) {
          this.currentFileUpload = new FileUploadModel(file);
          this.currentFileUpload.id_carga = this.id!;
          this.uploadService
            .pushFileToStorage(this.currentFileUpload)
            .subscribe(
              (perc) => {
                console.log(perc);
                this.percentage = Math.round(perc ? perc : 0);
                //console.log('emitting: ' + (this.percentage));
                //this.primeFileUpload.onProgress.emit({originalEvent:  $event, progress: this.percentage});
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    }
  }*/

  onRemove(event: any) {
    //console.log('remove');
  }

  uploadfun(event: any) {
    console.log('Multiple Files are uploaded: ', event.files);
  }

  onSelect(event: any): void {
    this.selectedFiles = event.currentFiles;
    this.uploadedFiles = [];
    this.fileUploader.files = [];
    this.images = [];
    for (let file of event.files) {
      this.images!.push(file);
    }
    this.send = false
    this.progress = 0
  }

  remove(event: Event, file: any) {
    const index: number = this.uploadedFiles.indexOf(file);
    this.primeFileUpload.remove(event, index);
  }

  onUpload(event: any) {
    console.log('onUpload');
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      //const index: number = this.uploadedFiles.indexOf(file);
      //console.log(index);
      //console.log(event);
      //this.primeFileUpload.remove(event, index);
      // this.primeFileUpload.onRemove.emit(file);
    }
    this.fileUploads = [];
    this.loadImages(this.id!, this.model);
    this.messageService.add({
      severity: 'success',
      summary: 'AVISO',
      detail: 'IMAGEM ENVIADA',
    });
  }

  limpar() {
    this.selectedFiles = [];
    this.images = []
    this.send = false
    this.progress = 0
    //while (this.images.length) {
    //  this.images.pop();
    //}
  }

  upload() {
    if (this.selectedFiles) {
      this.send = false;
      this.uploadProgress = this.imagemService
        .pushFileToStorage(this.selectedFiles, this.id!, this.model!)
        .pipe(
          map((event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
              this.progress = Math.round((100 / event.total) * event.loaded);
              console.log(this.progress);
            } else if (event.type == HttpEventType.Response) {
              //this.progress = 0;
              this.send = true;
              console.log('upload_complete');
              this.messageService.add({
                severity: 'success',
                summary: 'AVISO',
                detail: 'UPLOAD COMPLETO',
              });
              //this.limpar()
              this.loadImages(this.id!, this.model);
            }
          }),
          catchError((err: any) => {
            //this.progress = 0;
            alert(err.message);
            return throwError(() => err.message);
          })
        )
        .subscribe({
          complete: () => {
            console.log('Complete');

            //this.limpar()
          },
          next: (data) => {
            //this.percentage = Math.round(data ? data : 0);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  cancel() {
    if (this.uploadProgress) {
      this.uploadProgress.unsubscribe();
      this.progress = 0;
    }
  }

  async confirmDelete() {
    this.loadingDelete = true;
    this.imagemService
      .delete(this.fileUploads[this._activeIndex], this.model)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        complete: () => {
          //this.fileUploads = [];
        this.loadImages(this.id!, this.model);
        },
        next: (response) => {
          if (response) {
            this.loadingDelete = false;
            this.deleteRegistroDialog = false;
          }
        },
        error: (err) => {
          this.loadingDelete = false;
          this.deleteRegistroDialog = false;
          console.log(err);
        },
      });
  }

  handleMissingImage(event: Event) {
    //(event.target as HTMLImageElement).style.display = 'none';
    (event.target as HTMLImageElement).src = 'assets/images/galleria/galleria1.jpg';

  }

  deleteFileUpload(fileUpload: FileUploadModel) {
    this.deleteRegistroDialog = true;
    this.deletelfileUpload = fileUpload;
  }

  loadImages(code: string, model: string) {
    this.imagemService.getAll(code,model)
    .subscribe
    ({
      complete: () => {
      //this.fileUploads = [];
      // this.loadImages(this.id!, this.model);
      if (this.fileUploads.length > 0) { this.activeIndex = 0 }

      },
      next: (response) => {
        if (response) {
          console.log(response);
          this.fileUploads = response.data.reverse();
          console.log(this.fileUploads)
        }
      },
      error: (err) => {
        this.fileUploads = []
      },
    });
  }
}
