import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Galleria } from 'primeng/galleria';
import { ImagemService } from 'src/app/services/imagem.service';

@Component({
  selector: 'app-viewimages',
  templateUrl: './viewimages.component.html',
  styleUrls: ['./viewimages.component.scss'],
})
export class ViewimagesComponent implements OnInit, OnDestroy {
  @ViewChild('galleria') galleria: Galleria | undefined;
  showThumbnails: boolean | undefined;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  fileUploads: any[] = [];
  model = '';
  id?: string;

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
      numVisible: 1,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private imagemService: ImagemService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.model = this.route.snapshot.params['model'];
    console.log(this.id);
    this.loadImages(this.id!, this.model);
    this.bindDocumentListeners();
  }

  loadImages(code: string, model: string) {
    this.imagemService.getAll(code, model).subscribe({
      complete: () => {
        //this.fileUploads = [];
        // this.loadImages(this.id!, this.model);
        //if (this.fileUploads.length > 0) { this.activeIndex = 0 }
      },
      next: (response) => {
        if (response) {
          console.log(response);
          this.fileUploads = response.data.reverse();
          console.log(this.fileUploads);
        }
      },
      error: (err) => {
        this.fileUploads = [];
      },
    });
  }

  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    } else {
      this.openPreviewFullScreen();
    }

    this.cd.detach();
  }

  openPreviewFullScreen() {
    let elem =
      this.galleria?.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) {
      /* Firefox */
      elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) {
      /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) {
      /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
    this.cd.detectChanges();
    this.cd.reattach();
  }

  closePreviewFullScreen() {
    let doc:any = document
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc['mozCancelFullScreen'] ) {
      doc['mozCancelFullScreen']();
    } else if (doc['webkitExitFullscreen']) {
      doc['webkitExitFullscreen']();
    } else if (doc['msExitFullscreen']) {
      doc['msExitFullscreen']();
    }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener(
      'mozfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'msfullscreenchange',
      this.onFullScreenListener
    );
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${
      this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'
    }`;
  }
}
