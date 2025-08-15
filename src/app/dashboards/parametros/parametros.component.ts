import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Parametro } from 'src/app/models/param';
import { ParametroDataTransferService } from 'src/app/services/parametro-data-transfer.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { createId } from 'src/app/shared/utils';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametro.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ParametrosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // !memoryleak

  paramDialog: boolean = false;

  parametros: Parametro[] = [];

  parametro: Parametro = {
    id: -1,
    nome: undefined,
    legenda: undefined,
    pontos: undefined,
    status: false,
  };

  selectedParametros: Parametro[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  pesos: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  loading: boolean = false;
  loadingTable: boolean = false;
  totalRecords: number = 0;

  constructor(
    private parametroService: ParametroService,
    private parametroDtService: ParametroDataTransferService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (this.parametroDtService.getParametrosData().length != 0) {
      this.parametros = this.parametroDtService.getParametrosData();
      this.totalRecords = this.parametros.length;
    } else {
      this.loadingTable = true;
      //setTimeout(() => {
        this.getParametrosDatas();
      //}, 5000);
    }

    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'legenda', header: 'Legenda' },
      { field: 'pontos', header: 'Pontos' },
    ];

    this.pesos = [
      { label: 'REDUZIDO', value: 1 },
      { label: 'NORMAL', value: 2 },
      { label: 'MÁXIMO', value: 3 },
    ];
  }


  editParametro(parametro: Parametro) {
    this.parametro = { ...parametro };
    this.paramDialog = true;
  }

  loadParametros() {
    //console.log($event)
    if (this.parametroDtService.getParametrosData().length != 0) {
      this.parametros = this.parametroDtService.getParametrosData();
      this.totalRecords = this.parametros.length;
    } else {
      this.loadingTable = true;
      //setTimeout(() => {
        this.getParametrosDatas();
      //}, 500);
    }
  }

  openNew() {
    this.parametro = {
      id: -1,
      code: undefined,
      nome: undefined,
      legenda: undefined,
      pontos: undefined,
      status: false,
    };
    this.submitted = false;
    this.paramDialog = true;
  }

  saveParametro(parametro: Parametro) {
    this.parametro = { ...parametro };
    console.log(this.parametro);
    this.submitted = true;
    let save: boolean[] = [];
    this.submitted = true;

    if (this.parametro.nome?.trim()) {
      if (this.parametro.id != -1) {
        // @ts-ignore

        this.loading = true;
        this.parametroService
          .updateParametro(this.parametro)
          .pipe(takeUntil(this.destroy$)) // memory leak
          .subscribe({
            next: (response) => {
              if (response) {
                console.log(response);
                this.messageService.add({
                  severity: 'success',
                  summary: 'SUCESSO',
                  detail: 'PARÂMETRO ATUALIZADO',
                  life: 3000,
                });
                this.loading = false;
                this.parametros[this.findIndexById(response.id)] = response;
                this.totalRecords = this.parametros.length;
                this.parametros = [...this.parametros];
                this.paramDialog = false;
                this.parametro = {
                  id: -1,
                  code: undefined,
                  nome: undefined,
                  legenda: undefined,
                  pontos: undefined,
                  status: false,
                };
                this.parametroDtService.setParametrosDatas(this.parametros);
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
              console.log(err);
              this.paramDialog = false;
              this.parametros = [...this.parametros];
              this.parametro = {
                id: -1,
                code: undefined,
                nome: undefined,
                legenda: undefined,
                pontos: undefined,
                status: false,
              };
            },
          });
      } else {
        this.loading = true;
        this.parametroService
          .saveParametro(this.parametro)
          .pipe(takeUntil(this.destroy$)) // memory leak
          .subscribe({
            next: (response) => {
              if (response) {
                console.log(response);

                this.parametros.unshift(response);
                this.messageService.add({
                  severity: 'success',
                  summary: 'SUCESSO',
                  detail: 'PARÂMETRO CRIADO',
                  life: 3000,
                });
                this.loading = false;
                this.totalRecords = this.parametros.length;
                this.parametros = [...this.parametros];
                this.paramDialog = false;
                this.parametro = {
                  id: -1,
                  code: undefined,
                  nome: undefined,
                  legenda: undefined,
                  pontos: undefined,
                  status: false,
                };
                this.parametroDtService.setParametrosDatas(this.parametros);
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
              console.log(err);
              this.paramDialog = false;
              this.parametros = [...this.parametros];
              this.parametro = {
                id: -1,
                code: undefined,
                nome: undefined,
                legenda: undefined,
                pontos: undefined,
                status: false,
              };
            },
          });
      }
    }
  }

  findIndexById(id: any): number {
    let index = -1;
    for (let i = 0; i < this.parametros.length; i++) {
      if (this.parametros[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.paramDialog = false;
    this.submitted = false;
  }

  getParametrosDatas() {
    this.parametroService
      .getParametros()
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
              this.parametros = response.data;
              this.parametroDtService.setParametrosDatas(response.data);
              this.totalRecords = this.parametros.length;
              this.loadingTable = false;

          }
        },
        error: (err) => {
          console.log(err);
          this.loadingTable = false;
          this.parametros = []
        },
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
