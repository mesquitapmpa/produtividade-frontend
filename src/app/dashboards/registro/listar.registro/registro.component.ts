import { CacheService } from './../../../services/cache.service';
import { EfetivoService } from '../../../services/efetivo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Registro } from 'src/app/models/registro';
import { RegistroService } from 'src/app/services/registro.service';
import { Parametro } from 'src/app/models/param';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Efetivo } from 'src/app/models/efetivo';
import { environment } from 'src/app/environments/environment';
import { Router } from '@angular/router';
import { RegistroDataTransferService } from 'src/app/services/registro-data-transfer.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class RegistroComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // !memoryleak

  registroDialog: boolean = false;
  efetivoDialog: boolean = false;
  relatorioDialog: boolean = false;
  registros: Registro[] = [];

  deleteRegistroDialog: boolean = false;
  loading = false;
  loadingDelete = false;
  loadingRelatorio = false;
  maxDate: Date = new Date();
  loadingTable: boolean = false;
  EXCLUIR_TXT = environment.EXCLUIR_TXT;

  registro: Registro = {};

  atribuicaoOptions: SelectItem[] = [
    { label: 'RELEVÂNCIA 1', value: 1 },
    { label: 'RELEVÂNCIA 2', value: 2 },
    { label: 'RELEVÂNCIA 3', value: 3 },
  ];
  selectedRegistros: Registro[] = [];
  selectedMunicipio: any[] = [];
  selectedUnidade: any[] = [];
  selectedAtribuicao: any[] = [];

  listParametros: any[] = [];
  selectedParametros: Parametro[] = [];
  time: number = 3000;
  submitted: boolean = false;
  cols: any[] = [];
  pesos: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  data?: any[];
  cacheSubscription?: Subscription;

  constructor(
    private registroService: RegistroService,
    private efetivoService: EfetivoService,
    private cacheService: CacheService,
    private registroDtService: RegistroDataTransferService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // We subscribe to the BehaviorSubject in the cache service to receive data updates.
    this.cacheSubscription = this.cacheService.cache$.subscribe((data: any) => {
      console.log('update_table')
      this.registros = data as Registro[];
    });

    this.getRegistroDatas('listar.registro');
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // We unsubscribe from the cache and clear the cache data when the component is destroyed.
    this.cacheSubscription?.unsubscribe();
    this.cacheService.clear('listar.registro'); // you can adapt this according to your logic to clear the cache
  }

  loadLazy($event: any) {
    console.log($event);
  }

  novoRegistro() {
    this.cacheService.clear('editar.registro')
    this.router.navigate(['/app/registros/novo']);
  }

  imagesRegistro(registro: any) {
    this.router.navigate(['/app/images/', registro.code, "registro"]);
  }

  deleteRegistro(registro: Registro) {
    this.deleteRegistroDialog = true;
    this.registro = { ...registro };
  }

  confirmDelete() {
    this.deleteRegistroDialog = false;
    this.loadingDelete = true;
    this.registroService
      .deleteRegistro(this.registro)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            // // console.log(response)
            this.loadingDelete = false;
            this.registros = this.registros.filter(
              (val) => val.id !== this.registro.id
            );

            this.messageService.add({
              severity: 'success',
              summary: 'SUCESSO',
              detail: 'REGISTRO APAGADO',
              life: 3000,
            });

            //this.registros = [...this.registros];
            this.cacheService.set('listar.registro', this.registros);
            //this.registrosDtService.setRegistrosDatas(this.registros);
            this.registro = {};
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'OCORREU UM ERRO',
            detail: err.status,
            life: 3000,
          });
          this.loading = false;
          //console.log(err)
        },
      });
  }

  efetivoRegistro(registro: Registro) {
    this.registro = { ...registro };
    this.efetivoDialog = true;
  }

  hideDialogEfetivo() {
    this.efetivoDialog = false;
    // // console.log(this.registro);
  }

  removerMilitar(militar: Efetivo) {
    // // console.log(militar);
    this.efetivoService
      .deleteEfetivo(militar)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            // // console.log(response)
            this.messageService.add({
              severity: 'success',
              summary: 'SUCESSO',
              detail: 'REGISTRO APAGADO',
              life: 3000,
            });

            let guarnicao = this.registro.militares;
            let index = -1;
            for (let i = 0; i < guarnicao!.length; i++) {
              if (guarnicao![i].idpessoa == militar.idpessoa) {
                index = i;
                break;
              }
            }
            this.registro.militares?.splice(index, 1);
            this.registros = [...this.registros];
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'OCORREU UM ERRO',
            detail: err.status,
            life: 3000,
          });
          this.loading = false;
          //console.log(err)
        },
      });
  }

  relatorioRegistro(registro: Registro) {
    this.registro = { ...registro };
    this.relatorioDialog = true;
  }

  saveRelatorio(registro: Registro) {
    this.loadingRelatorio = true;
    this.registroService
      .updateRelatorio(this.registro)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            // // console.log(response)

            let id = registro.id;
            let index = this.findIndexById(id);
            this.registros[index] = registro;
            this.relatorioDialog = false;

            this.messageService.add({
              severity: 'success',
              summary: 'SUCESSO',
              detail: 'RELATÓRIO ATUALIZADO',
              life: this.time,
            });
            this.loadingRelatorio = false;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'OCORREU UM ERRO',
            detail: err.status,
            life: 3000,
          });
          this.loadingRelatorio = false;
          // // console.log(err)
        },
      });
  }

  hideDialogRelatorio() {
    this.relatorioDialog = false;
  }

  findIndexById(id: any): number {
    let index = -1;
    for (let i = 0; i < this.registros.length; i++) {
      if (this.registros[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onDropDownChange(efetivo: Efetivo) {
    // console.log(efetivo)
    this.efetivoService
      .updateEfetivo(efetivo)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            // console.log(response)
            this.messageService.add({
              severity: 'success',
              summary: 'SUCESSO',
              detail: 'RELEVÂNCIA ATUALIZADA',
              life: 3000,
            });
            this.loading = false;
            this.registro.militares![this.findIndexById(response.id)] =
              response;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'OCORREU UM ERRO',
            detail: err.status,
            life: 3000,
          });
          this.loading = false;
          // console.log(err)
        },
      });
  }

  getRegistroDatas(page: string) {
    const cachedData = this.cacheService.get(page);
    // If the data is not in cache, we retrieve it from the server and store it in the cache.
    if (!cachedData) {
      this.loadingTable = true;
      this.registroService
        .getRegistros()
        .pipe(takeUntil(this.destroy$))
        // memory leak
        .subscribe({
          complete: () => {
            this.loadingTable = false;
          },
          next: (response) => {
            if (response) {
              if (response.data.length > 0) {
                this.registros = response.data.map((item) => {
                  item.efetivo = '';
                  item.militares?.forEach((militar) => {
                    item.efetivo +=
                      militar.str_graduacao + ' ' + militar.nome_guerra + ' ';
                  });
                  return item;
                });
                //this.registros = response.data;
                console.log(this.registros);
                //this.registrosDtService.setRegistrosDatas(response.data);
                this.cacheService.set(page, response.data);
              }
              this.loadingTable = false;
            }
          },
          error: (err) => {
            // console.log(err);
            this.loadingTable = false;
          },
        });
    }
  }

  editRegistro(registro: Registro) {
    let registros: any[] = []
    registro.data = registro.data == undefined ? new Date() : new Date(registro.data);
    this.registroDtService.setRegistro(registro);
    this.router.navigate(['/app/registros/edit/', registro.code]);
    registros.push(registro)
    this.cacheService.set('editar.registro', registros);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
