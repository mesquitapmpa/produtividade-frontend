import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Armamento } from 'src/app/models/armamento';
import { Efetivo } from 'src/app/models/efetivo';
import { ArmamentoDBService } from 'src/app/services/armamento_db.service';
import { EfetivoService } from 'src/app/services/efetivo.service';
import { getImage } from 'src/app/shared/utils';

@Component({
  selector: 'app-cautela',
  templateUrl: './cautela.component.html',
  styleUrls: ['./cautela.component.scss']
})
export class CautelaComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>(); // !memoryleak
  loadingTable = false
  registroDialog = false
  cautelas: any[] = []
  formGroup: FormGroup | undefined;
  sourceEfetivos: Efetivo[] = [];
  sourceArmamento: Armamento[] = [];
  submitted = false

  constructor(
   private efetivoService: EfetivoService,
   private armamentoDBService: ArmamentoDBService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getEfetivo()
    this.getArmamentos()
    this.formGroup = new FormGroup({
      selectedEfetivo: new FormControl<Efetivo | null>(null, [Validators.required]),
      selectedArmamento: new FormControl<Armamento | null>(null, [Validators.required]),
     // nrp: new FormControl<string | null>(null, [Validators.required]),
     // carregadores: new FormControl<number | null>(null, [Validators.required]),
     // status: new FormControl<Status | null>(null, [Validators.required]),
     // unidade: new FormControl<Unidade | null>(null, [Validators.required]),
     // obs: new FormControl<string | null>(null, []),
    });
  }

  openNew() {
    this.registroDialog = true
  }

  getEfetivo() {
    this.efetivoService
      .getEfetivo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {
          this.sourceEfetivos?.map(
            (val) => {
              val.image = 'https://sigpol.pm.pa.gov.br/upload/pessoa/' + getImage(val.idpessoa.toString()) +'foto.jpg'
              val.str_graduacao = val.graduacao.graduacao
              val.str_quadro = val.graduacao.quadro.quadro
              val.nome = val.str_graduacao + ' ' + val.str_quadro + ' RG ' + val.rg + ' ' +val.nome
            }
          );
        },
        next: (response) => {
          if (response) {
            if (response.rows.length > 0) {
              this.sourceEfetivos = response.rows;
              console.log(this.sourceEfetivos)
            }
          }
        },
        error: (err) => {
          // console.log(err);
        },
      });
  }

  getArmamentos() {

    this.armamentoDBService
      .getAll()
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        complete: () => {
          this.sourceArmamento?.map(
            (val) => {
              val.marca!.name = val.marca!.name + ' Nº SÉRIE ' + val.nserie + ' RP ' + val.nrp
            }
          );
        },
        next: (response) => {
          if (response) {
            console.log(response);
            if (response.data.length > 0) {
              this.sourceArmamento = response.data;
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
