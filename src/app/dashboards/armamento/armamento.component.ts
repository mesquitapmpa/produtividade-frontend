import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, map, takeUntil } from 'rxjs';
import { Armamento } from 'src/app/models/armamento';
import { ArmamentoDataTransferService } from 'src/app/services/armamento-data-transfer.service';
import { ArmamentoService } from 'src/app/services/armamento.service';
import { ArmamentoDBService } from 'src/app/services/armamento_db.service';
import { FilterService } from 'primeng/api';
import { ArmamentosDataTransferService } from 'src/app/services/armamentos-data-transfer.service';

interface Marca {
  name: string;
  code: string;
}
interface Status {
  name: string;
  code: string;
}
interface Unidade {
  name: string;
  code: string;
}

@Component({
  selector: 'app-armamento',
  templateUrl: './armamento.component.html',
  styleUrls: ['./armamento.component.scss'],
})
export class ArmamentoComponent implements OnInit {

  marcas: Marca[] | undefined;
  private destroy$ = new Subject<void>(); // !memoryleak
  unidades: Unidade[] | undefined;
  status: Status[] | undefined;
  formGroup: FormGroup | undefined;
  key: string | undefined;
  registros: any = [];
  armamentos: Armamento[] = [];
  currentArmamento?: Armamento;
  cols: any[] = [];
  loadingTable = false;
  loadingSave = false;
  selectedRegistros = [];
  registroDialog = false;
  submitted = false;
  function?: string;
  deleteRegistroDialog = false;
  loadingDelete = false;
  EXCLUIR_TXT = environment.EXCLUIR_TXT;

  constructor(
    private armamentosDataTransferService: ArmamentosDataTransferService,
    private armamentoDBService: ArmamentoDBService,
    private messageService: MessageService,
    private armamentoDTransferService: ArmamentoDataTransferService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getArmamentosDatas() {
    this.loadingTable = true;
    this.armamentoDBService
      .getAll()
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        complete: () => {
          console.log('complete');
          this.loadingTable = false;
          this.cookieService.set('REQUEST', "false")
        },
        next: (response) => {
          if (response) {
            console.log(response);
            if (response.data.length > 0) {
              this.armamentos = response.data;
              this.armamentosDataTransferService.setArmamentosDatas(
                this.armamentos
              );
              console.log(
                this.armamentosDataTransferService.getArmamentosData()
              );
              //this.parametroDtService.setParametrosDatas(response.data);
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  saveArmamento(armamento: any) {
    this.armamentoDBService
      .save(armamento)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        complete: () => {
          this.registroDialog = false;
          this.loadingSave = false;
          this.showToast('success', 'AVISO', 'ARMAMENTO SALVO', 3000);
        },
        next: (response) => {
          if (response) {
            console.log(response);
            //this.armamentos.unshift(response);
            this.getArmamentosDatas();
          }
        },
        error: (err) => {
          this.showToast('error', 'OCORREU UM ERRO', err.status, 3000);
        },
      });
  }

  updateArmamento(armamento: Armamento) {
    this.armamentoDBService
      .update(armamento)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        complete: () => {
          console.log('updated item successfully!');
          this.formGroup?.reset();
          this.submitted = false;
          this.key = undefined;
          this.registroDialog = false;
          this.loadingSave = false;
          this.currentArmamento = undefined;
          this.showToast('success', 'AVISO', 'ARMAMENTO EDITADO', 3000);
        },
        next: (response) => {
          if (response) {
            console.log(response);
            //this.armamentos.unshift(response);
            this.getArmamentosDatas();
          }
        },
        error: (err) => {
          this.showToast('error', 'OCORREU UM ERRO', err.status, 3000);
        },
      });
  }

  ngOnInit() {
    this.function = this.route.snapshot.params['function'];
    console.log(this.function);
    this.marcas = [
      { name: 'TAURUS/PISTOLA/PT 940/.40', code: 'TP940.40' },
      { name: 'BERETTA/PISTOLA/APX/.40', code: 'BPAPX.40' },
    ];

    this.status = [
      //{ name: 'DISPONÍVEL', code: 'DISP' },
      //{ name: 'CAUTELADO', code: 'CAUT' },
      { name: 'TRANSFERIDO', code: 'TRANSF' },
      { name: 'MANUTENÇÃO', code: 'MANUT' },
      { name: 'PERÍCIA', code: 'PER' },
      { name: 'EXTRAVIADO', code: 'EXT' },
      { name: 'RESERVA DE ARMAMENTO', code: 'RES' },
    ];

    this.unidades = [{ name: '32º BPM', code: '32bpm' }];

    this.formGroup = new FormGroup({
      marca: new FormControl<Marca | null>(null, [Validators.required]),
      nserie: new FormControl<string | null>(null, [Validators.required]),
      nrp: new FormControl<string | null>(null, [Validators.required]),
      carregadores: new FormControl<number | null>(null, [Validators.required]),
      status: new FormControl<Status | null>(null, [Validators.required]),
      unidade: new FormControl<Unidade | null>(null, [Validators.required]),
      obs: new FormControl<string | null>(null, []),
    });

    let request = this.cookieService.get('REQUEST');

    if (request == 'true') {
      this.getArmamentosDatas();
    } else {
      if (this.armamentosDataTransferService.getArmamentosData().length != 0) {
        this.armamentos =
          this.armamentosDataTransferService.getArmamentosData();
      } else {
        this.loadingTable = true;
        //setTimeout(() => {
        this.getArmamentosDatas();
        //}, 5000);
      }
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.registroDialog = true;
    this.formGroup?.reset();
    this.submitted = false;
    this.key = undefined;
  }
  sairDialog() {
    this.registroDialog = false;
  }

  findIndexByCode(code: any): number {
    let index = -1;
    for (let i = 0; i < this.armamentos.length; i++) {
      if (this.armamentos[i].code === code) {
        // console.log(this.registros[i].code)
        // console.log(code)
        index = i;
        break;
      }
    }
    return index;
  }

  editRegistro(armamento: any) {
    if (armamento.status.name != 'CAUTELADO') {
      this.openNew();
      this.key = armamento.code;
      console.log(this.key);

      this.formGroup?.patchValue({
        marca: armamento.marca,
        nserie: armamento.nserie,
        nrp: armamento.nrp,
        carregadores: armamento.carregadores,
        status: armamento.status,
        unidade: armamento.unidade,
        obs: armamento.obs,
      });

      this.currentArmamento = armamento;
      console.log(this.currentArmamento);
    } else {
      this.showToast(
        'error',
        'AVISO',
        'NÃO É PERMITIDO EDITAR ARMAMENTO CAUTELADO',
        3000
      );
    }
  }

  deleteRegistro(registro: any) {
    if (registro.status.name != 'CAUTELADO') {
      this.key = registro.key;
      this.deleteRegistroDialog = true;
    } else {
      this.showToast(
        'error',
        'AVISO',
        'NÃO É PERMITIDO APAGAR ARMAMENTO CAUTELADO',
        3000
      );
    }
  }

  showToast(severity: string, summary: string, detail: string, life: number) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
      key: 'toast1',
    });
  }

  confirmDelete() {
    this.loadingDelete = true;
    /*this.armamentoService.delete(this.key!).then(() => {
      console.log('deleted item successfully!');
      //this.refreshList()
      this.deleteRegistroDialog = false;
      this.loadingDelete = false;
    });*/
  }

  uploadImage(armamento: Armamento) {
    console.log(armamento.code);
    this.router.navigate(['/app/imagens/', armamento.code]);
    this.armamentoDTransferService.setArmamentoDatas(armamento);
  }

  async save() {
    this.submitted = true;
    if (this.formGroup?.valid) {
      let data = this.formGroup?.value;
      this.loadingSave = true;
      data.unidade_vinculada = this.cookieService.get('unidade');

      if (this.key == undefined) {
        this.saveArmamento(data);
      } else {
        data.code = this.currentArmamento?.code;
        data.unidade_vinculada = this.currentArmamento?.unidade_vinculada;
        data.create_at = this.currentArmamento?.create_at;

        this.updateArmamento(data);
      }
    } else {
      this.showToast('error', 'AVISO', 'CAMPO(s) OBRIGATÓRIOS PENDENTES', 3000);
    }
  }
}
