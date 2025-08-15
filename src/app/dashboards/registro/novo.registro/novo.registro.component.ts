import { Efetivo } from './../../../models/efetivo';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { MultiSelect } from 'primeng/multiselect';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Parametro } from 'src/app/models/param';
import { Registro } from 'src/app/models/registro';
import { CacheService } from 'src/app/services/cache.service';
import { ConfigService } from 'src/app/services/config.service';
import { EfetivoService } from 'src/app/services/efetivo.service';
import { ParametroService } from 'src/app/services/parametro.service';
import { RegistroService } from 'src/app/services/registro.service';
import { getImage } from 'src/app/shared/utils';

interface Municipio {
  name: string;
  code: string;
}

interface Unidade {
  name: string;
  code: string;
}

interface Event {
  msguarnicao: any;
  msocorrencia: any;
  msmunicipio: any;
  msunidade: any;
}

interface Militar {

  idpessoa: number;
  nome: string;

}

interface Image {
  name: string;
  objectURL: string;
}

@Component({
  selector: 'app-novo.registro',
  templateUrl: './novo.registro.component.html',
  styleUrls: ['./novo.registro.component.scss'],
})
export class NovoRegistroComponent implements OnInit, OnDestroy {
  @ViewChild('msguarnicao') msguarnicao!: MultiSelect;
  @ViewChild('msocorrencia') msocorrencia!: MultiSelect;
  @ViewChild('msmunicipio') msmunicipio!: MultiSelect;
  @ViewChild('msunidade') msunidade!: MultiSelect;
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  $event: Event = {
    msguarnicao: undefined,
    msmunicipio: undefined,
    msocorrencia: undefined,
    msunidade: undefined,
  };

  isDone = false
  militares!: Militar[];
  private destroy$ = new Subject<void>(); // !memoryleak
  cacheSubscription?: Subscription;
  maxDate: Date = new Date();
  formGroup: FormGroup | undefined;
  selectedMunicipio: Municipio[] = [];
  selectedUnidade: Unidade[] = [];
  selectedParametros: Parametro[] = [];
  sourceEfetivos: Efetivo[] = [];
  loading = false;
  registro?: Registro;
  efetivo: Militar[] = [];

  constructor(
    private configService: ConfigService,
    private parametroService: ParametroService,
    private registroService: RegistroService,
    private efetivoService: EfetivoService,
    private messageService: MessageService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // We unsubscribe from the cache and clear the cache data when the component is destroyed.
    //this.cacheSubscription?.unsubscribe();
    //this.cacheService.clear('editar.registro'); // you can adapt this according to your logic to clear the cache
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  save() {

    let militares: Efetivo[] = []
    if (this.formGroup?.valid) {
      this.loading = true;
      this.formGroup?.get('guarnicao')?.value.forEach((element: Militar) => {

        let idx: number = this.findIndexById(element.idpessoa, this.sourceEfetivos);
        let r: Efetivo = this.sourceEfetivos[idx];
        console.log(r)
        r.relevancia = r.relevancia ? r.relevancia : 'RELEVÂNCIA 1';
        militares.push(r)
      });

      this.registro = {
        ...this.registro,
        data: this.formGroup?.controls['date'].value,
        municipio: this.formGroup?.value.municipio[0].name,
        unidade: this.formGroup?.value.unidade[0].name,
        parametro_id: this.formGroup?.value.ocorrencia[0].id,
        militares: militares,
        relatorio: this.formGroup?.controls['relatorio'].value,
      };

      if (this.registro?.id) {

        this.registroService
          .updateRegistro(this.registro)
          .pipe(takeUntil(this.destroy$)) // memory leak
          .subscribe({
            complete: () => {
              // console.log(response)
              this.loading = false;
              this.messageService.add({
                severity: 'success',
                summary: 'SUCESSO',
                detail: 'REGISTRO ATUALIZADO',
                life: 3000,
              });
            },
            next: (response) => {
              if (response) {
                console.log(response);
                this.registro = response;
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
            },
          });

      } else {

        this.registroService
          .saveRegistro(this.registro)
          .pipe(takeUntil(this.destroy$)) // memory leak
          .subscribe({
            complete: () => {
              this.loading = false;
              this.messageService.add({
                severity: 'success',
                summary: 'SUCESSO',
                detail: 'REGISTRO CRIADO',
                life: 3000,
              });
            },
            next: (response) => {
              if (response) {
                console.log(response);
                this.registro = response;
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'OCORREU UM ERRO',
                detail: err.status,
                life: 3000,
              });
              console.log(err);
            },
          });
      }
    }
  }


  /*findIndexById(idpessoa: number, list: any[]): Efetivo {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i].idpessoa === idpessoa) {
        index = i;
        break;
      }
    }
    return list[index];
  }*/

  findIndexById(idpessoa: number, list: { idpessoa: number }[] = []): number {
    if (!Array.isArray(list)) return -1;
    return list.findIndex(item => item?.idpessoa === idpessoa);
  }

  findIndexByIdOptions(name: string, list: any[]): any {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === name) {
        index = i;
        break;
      }
    }
    return list[index];
  }

  limpar() {
    this.formGroup?.reset();
    this.registro = {};
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      municipio: new FormControl<Municipio | null>(null, [Validators.required]),
      unidade: new FormControl<Unidade | null>(null, [Validators.required]),
      date: new FormControl<Date | null>(null, [Validators.required]),
      ocorrencia: new FormControl<Parametro | null>(null, [
        Validators.required,
      ]),
      relatorio: new FormControl<string | null>(null, [Validators.required]),
      guarnicao: new FormControl<Militar[] | null>(null, [Validators.required]),
    });

    this.sourceEfetivos = []
    this.getMunicipios();
    this.getUnidades();
    this.getOcorrencias();

  }

  onChangeMultiSelect(event: any, title: string) {
    //console.log(event)
    //console.log("onChangeMsGuarnicao")

    switch (title) {
      case 'msguarnicao': {
        this.$event = { ...this.$event, msguarnicao: { value: event } };
        break;
      }
      case 'msocorrencia': {
        this.$event = { ...this.$event, msocorrencia: { value: event } };
        break;
      }
      case 'msunidade': {
        this.$event = { ...this.$event, msunidade: { value: event } };
        break;
      }
      default: {
        this.$event = { ...this.$event, msmunicipio: { value: event } };
        break;
      }
    }
  }

  imagesRegistro(registro: Registro) {
    registro.data = registro.data == undefined ? new Date() : new Date(registro.data);
    let registros: Registro[] = []
    registros.push(registro)
    this.cacheService.set('editar.registro', registros);
    this.router.navigate(['/app/images/', registro.code, "registro"]);
  }

  onRemove($event: any) {
    console.log($event);
  }

  onclickMultiSelect(ms: MultiSelect, index: number, tag: any) {
    ms.value?.splice(index!, 1);
    ms.onChange.emit({
      originalEvent: this.$event.msguarnicao,
      value: tag,
      itemValue: tag,
    });
    // ms.updateLabel(); // Método não existe no tipo MultiSelect
    console.log(ms);
  }

  onRemoveMultiSelect(ms: MultiSelect, index: number, tag: any) {
    ms.value?.splice(index!, 1);
    ms.onChange.emit({
      originalEvent: this.$event.msguarnicao,
      value: tag,
      itemValue: tag,
    });
    console.log(ms);
  }

  onChipRemove(tag: any, ms: MultiSelect, title: string) {
    const index = ms.value?.indexOf(tag);
    //console.log(this.event$)
    //console.log(index)
    if (index !== -1) {
      switch (title) {
        case 'msguarnicao': {
          this.onRemoveMultiSelect(ms, index!, tag);
          if (this.formGroup?.controls['guarnicao'].value?.length == 0) {
            this.formGroup?.controls['guarnicao'].setValue(null);
          }
          break;
        }
        case 'msocorrencia': {
          this.onRemoveMultiSelect(ms, index!, tag);
          this.formGroup?.controls['ocorrencia'].setValue(null);
          break;
        }
        case 'msunidade': {
          this.onRemoveMultiSelect(ms, index!, tag);
          this.formGroup?.controls['unidade'].setValue(null);
          break;
        }
        default: {
          this.onRemoveMultiSelect(ms, index!, tag);
          this.formGroup?.controls['municipio'].setValue(null);
          break;
        }
      }
    }
  }

  onClick($event: any) {
    console.log($event.checked);
  }

  getEfetivo(page: string) {
    console.log('getEfetivo()')
    const cachedData = this.cacheService.get(page);
    if (!cachedData) {
    this.efetivoService
      .getEfetivo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {
          console.log('complete')
          this.sourceEfetivos?.map((val) => {
            val.image =
              'https://sigpol.pm.pa.gov.br/upload/pessoa/' +
              getImage(val.idpessoa.toString()) +
              'foto.jpg';
            val.str_graduacao = val.graduacao.graduacao;
            val.str_quadro = val.graduacao.quadro.quadro;
            val.nome =
              val.str_graduacao +
              ' ' +
              val.str_quadro +
              ' RG ' +
              val.rg +
              ' ' +
              val.nome;
          });

          console.log(this.sourceEfetivos)

          let efetivo: Militar[] = [];
          this.sourceEfetivos.forEach((data: any) => {
            efetivo.push({
              idpessoa: data.idpessoa,
              nome: data.nome,
            });
          });
          this.militares = efetivo;
          this.cacheService.set(page, this.militares);
          this.cacheService.set('listar.efetivo.full', this.sourceEfetivos)
          // We subscribe to the BehaviorSubject in the cache service to receive data updates.
          this.loadRegistro()

        },
        next: (response) => {
          if (response) {
            if (response.rows.length > 0) {
              this.sourceEfetivos = response?.rows;
              console.log('next')
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });

    } else {
      console.log("carregando_cache_efetivo")
      this.sourceEfetivos = this.cacheService.get('listar.efetivo.full')
      this.militares = this.cacheService.get(page);
      this.isDone = true
      this.loadRegistro()
    }
  }

  loadRegistro(){

    let response = this.cacheService.get('editar.registro');
    if (response) {
      this.registro = response[0];
      console.log(this.registro)
      console.log(this.msguarnicao);

      let efetivos: Militar[] = [];

      this.registro?.militares?.forEach((data) => {
        console.log(data);
        let status = false
        let nome = ''
        let str= data.nome;
        let str_graduacao= data.str_graduacao
        let str_quadro = data.str_quadro
        let rg = data.rg

        if (!str.includes(str_graduacao)) {
          nome = str_graduacao
          status = true
        }
        if (!str.includes(str_quadro)) {
          nome += ' ' + str_quadro
          status = true
        }
        if (!str.includes(rg.toString())) {
          nome +=  ' RG ' + rg + ' '+ str
          status = true
        }

        efetivos.push({
          idpessoa: data.idpessoa,
          nome: status ? nome: data.nome,
        });
      });


     let u = this.findIndexByIdOptions(this.registro?.unidade, this.selectedUnidade) as Unidade
     let m = this.findIndexByIdOptions(this.registro?.municipio, this.selectedMunicipio) as Municipio

      this.formGroup?.patchValue({
        municipio: [m],
        unidade: [u],
        ocorrencia: [this.registro?.parametro],
        date: this.registro?.data,
        relatorio: this.registro?.relatorio!,
        guarnicao: efetivos,
      });

      //this.formGroup?.get('guarnicao')?.setValue(efetivos);
      //console.log(this.formGroup?.get('guarnicao')?.value);
    }
    this.isDone = true
  }
  onSelectAllChange(event: any) {
    console.log(event);
  }

  onModelChange($event: any) {
    console.log($event);
  }
  findIndexByIdGuarnicao(idpessoa: number): number {
    let index = -1;
    for (let i = 0; i < this.sourceEfetivos.length; i++) {
      if (this.sourceEfetivos[i].idpessoa === idpessoa) {
        index = i;
        break;
      }
    }
    return index;
  }

  getOcorrencias() {
    this.parametroService.getParametros().subscribe({
      next: (response) => {
        this.selectedParametros = response.data;
        console.log('getOcorrencias()');
        this.getEfetivo('listar.efetivo');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMunicipios() {
    this.configService.getMunicipios().subscribe({
      next: (response) => {
        this.selectedMunicipio = response.data;
        // console.log(this.selectedMunicipio);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUnidades() {
    this.configService.getUnidades().subscribe({
      next: (response) => {
        this.selectedUnidade = response.data;
        //console.log(this.selectedUnidade);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
