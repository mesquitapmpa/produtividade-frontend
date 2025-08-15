import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { Subject, map, takeUntil } from 'rxjs';
import { Form, FormResponse, Item } from 'src/app/models/formResponse';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  dynamicForm?: FormGroup;
  title: string = 'Selecione o Formulário';
  plainMenuItems: MenuItem[] = [];
  private destroy$ = new Subject<void>(); // !memoryleak
  activeItem: MenuItem | undefined;
  items: Item[] = [];
  submitted: boolean = false;
  date: Date = new Date();
  loadingGetForm: boolean = false;
  loadingSave: boolean = false;
  loadingGetList: boolean = false;
  formulario: Form = new Form();
  form?: FormResponse;
  novo: boolean = false;
  deleteForm: boolean = false;
  loadingDelete: boolean = false;
  formularios?: any[];
  currentForm?: Form;
  currentIndex = -1;
  messages: Message[] = [];
  loadingFormulario: boolean[] = [];

  constructor(
    private formservice: FormService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) {}

  confirmDelete() {
    let key = this.formularios![this.currentIndex].key;
    this.loadingDelete = true;
    this.firebaseService.delete(key).then(() => {
      console.log('deleted item successfully!');
      this.loadingDelete = false;
      this.deleteForm = false;
      //this.refreshList()
    });

    this.messageService.add({
      severity: 'success',
      summary: 'APAGAR',
      detail: 'FORMULÁRIO APAGADO',
      life: 3000,
    });
  }

  retrieveFormularios(formid: string): void {
    this.firebaseService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes
            .map((c) => ({ key: c.payload.key, ...c.payload.val() }))
            .sort((a, b) => b.created_at! - a.created_at!)
        )
      )
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.formularios = data;
          this.loadingGetList = false;
          this.formularios.forEach((el: any, idx: number) => {
            this.loadingFormulario.push(false);
          });
        } else {
          this.formularios = [];
          this.loadingGetList = false;
        }
      });
  }

  refreshList(): void {
    this.currentForm = undefined;
    this.currentIndex = -1;
    this.retrieveFormularios(this.activeItem?.id!);
  }

  selectFormDelete(index: number) {
    this.deleteForm = true;
    this.currentIndex = index;
  }

  setActiveForm(form: Form, index: number): void {
    this.dynamicForm?.reset();
    this.currentForm = form;
    this.currentIndex = index;
    this.novo = true;
    console.log(this.currentForm);
    console.log(this.currentIndex);
    console.log(this.currentForm.key);
    //console.log(this.dynamicForm);

    const keys = Object.keys(this.currentForm?.items);
    keys.forEach((key) => {
      //console.log(key);
      if (key == '47546d63') {
        const date = new Date(this.currentForm?.items[key] * 1000);
        //console.log(date);
        this.dynamicForm?.controls[key].setValue(date);
      } else {
        this.dynamicForm?.controls[key].setValue(this.currentForm?.items[key]);
      }
    });

    this.messageService.add({
      severity: 'warn',
      summary: 'EDITAR',
      detail: 'FORMULÁRIO ' + this.currentForm.key,
      life: 3000,
    });
  }

  ngOnInit(): void {
    this.plainMenuItems = [
      {
        label: 'PRODUTIVIDADE CPR-IX',
        icon: 'pi pi-fw pi-pencil',
        id: '1x0Ef1QSorAhX9gfyAW2uG1JmGLmPkv2IU6LRbCWCkPM',
        // command: () => this.open("1x0Ef1QSorAhX9gfyAW2uG1JmGLmPkv2IU6LRbCWCkPM")
      },
      /*{
        label: 'ABASTECIMENTO',
        icon: 'pi pi-fw pi-pencil',
        id: '1ilrt4eVy1Qw5vo5-rb-a5elMqHvZ_vbc4cMEn8Zd4D4',
        // command: () => this.open("1x0Ef1QSorAhX9gfyAW2uG1JmGLmPkv2IU6LRbCWCkPM")
      },*/
    ];

    //this.activeItem = this.plainMenuItems[1]
    //this.retrieveFormularios(this.activeItem?.id!);
  }

  limparCampos() {
    this.novo = true;
    this.submitted = false;
    this.formulario = new Form();
    this.currentForm = undefined;
    this.currentIndex = -1;
    this.dynamicForm?.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'NOVO',
      detail: 'FORMULÁRIO',
      life: 3000,
    });
  }

  setFormulario(): Form {

    this.formulario.formId = this.form?.formId;
    this.formulario.info = this.form?.info;
    const keys = Object.keys(this.dynamicForm?.value);
    keys.forEach((key) => {
      if (
        Object.prototype.toString.call(this.dynamicForm?.value[key]) ===
        '[object Date]'
      ) {
        //console.log(this.dynamicForm?.value[key]);
        // ✅ Get timestamp in Milliseconds
        const date = new Date(this.dynamicForm?.value[key]);
        //console.log(date); // 👉️ 1650931200000
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        this.dynamicForm!.value[key] = unixTimestamp;
      }
    });

    this.formulario.items = this.dynamicForm?.value;
    this.formulario.linkedSheetId = this.form?.linkedSheetId;
    this.formulario.status = false; // não
    this.submitted = true;
    this.loadingSave = true;

    return this.formulario;
  }

  enviarFormulario(form: Form, index: number) {
    this.loadingFormulario[index] = true;
    this.formservice
      .saveForm(form)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            //console.log(response);
            let key = this.formularios![index].key;
            let created_at = this.formularios![index].created_at;
            let status = this.formularios![index].status;
            //console.log(status)
            const date = new Date(created_at * 1000);
            form.created_at = Math.floor(date.getTime() / 1000);
            form.updated_at = Math.floor(new Date().getTime() / 1000);

            if (response?.updates != undefined) {
              form.tableRange = response?.updates?.updatedRange;
              console.log('response?.updates != undefined');
            } else {
              form.tableRange = response?.updatedRange;
              console.log('form.tableRange = response?.updatedRange');
            }

            /*this.firebaseService.update(key, form).then(() => {
                  console.log('Updated item successfully!');
                  //console.log(JSON.stringify(form))
                  this.submitted = false;
                  this.loadingSave = false;
                  this.novo = false;
                  //this.refreshList()
                  this.loadingFormulario[index] = false
                  this.formularios![index].status = true
                  form.status = true
                  this.messageService.add({
                    severity: 'success',
                    summary: 'EDITAR',
                    detail: 'FORMULÁRIO ATUALIZADO',
                    life: 3000,
                  });

                });*/
          }
        },
        error: (err) => {
          this.loadingFormulario[index] = false;
          this.formularios![index].status = false;
          form.status = false;
          this.messageService.add({
            severity: 'error',
            summary: 'OCORREU UM ERRO',
            detail: err.status,
            life: 3000,
          });
        },
      });
  }

  salvarFormulario() {
    this.submitted = true;
    if (this.dynamicForm?.valid) {
      if (!this.currentForm?.key) {
        let form = this.setFormulario();
        this.formservice
          .saveForm(form)
          .pipe(takeUntil(this.destroy$)) // memory leak
          .subscribe({
            next: (response) => {
              if (response) {
                if (response?.updates != undefined) {
                  form.tableRange = response?.updates?.updatedRange;
                  console.log('response?.updates != undefined');
                } else {
                  form.tableRange = response?.updatedRange;
                  console.log('form.tableRange = response?.updatedRange');
                }
                form.status = true
                form.created_at = Math.floor(new Date().getTime() / 1000);
                form.updated_at = form.created_at

                this.firebaseService.create(form).then(() => {
                  console.log('Created new item successfully!');
                  console.log(JSON.stringify(form));
                  this.submitted = false;
                  this.loadingSave = false;
                  this.novo = false;
                  //this.refreshList()
                  this.messageService.add({
                    severity: 'success',
                    summary: 'EDITAR',
                    detail: 'FORMULÁRIO SALVO',
                    life: 3000,
                  });
                });
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'OCORREU UM ERRO',
                detail: err.status,
                life: 3000,
              });
            },
          });
      } else {
        // ATUALIZAR LINHA
        let form = this.setFormulario()
        let key = this.currentForm.key;
        let created_at = this.currentForm.created_at;
        const date = new Date(created_at! * 1000);
        form.created_at = Math.floor(date.getTime() / 1000);
        form.updated_at = Math.floor(new Date().getTime() / 1000);
        form.status = this.currentForm?.status
        form.tableRange = this.currentForm?.tableRange

        this.formservice
          .saveForm(form)
          .pipe(takeUntil(this.destroy$)) // memory leak
          .subscribe({
            next: (response) => {
              if (response) {
                if (response?.updates != undefined) {
                  form.tableRange = response?.updates?.updatedRange;
                  //console.log('response?.updates != undefined');
                } else {
                  form.tableRange = response?.updatedRange;
                  //console.log('form.tableRange = response?.updatedRange');
                }

                this.firebaseService.update(key, form).then(() => {
                  console.log('Updated item successfully!');
                  //console.log(JSON.stringify(form));
                  this.submitted = false;
                  this.loadingSave = false;
                  this.novo = false;
                  //this.refreshList()
                  this.messageService.add({
                    severity: 'success',
                    summary: 'EDITAR',
                    detail: 'FORMULÁRIO ATUALIZADO',
                    life: 3000,
                  });
                });

              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'OCORREU UM ERRO',
                detail: err.status,
                life: 3000,
              })}
            })
      }

    } else {
      // CAMPOS OBRIGATÓRIOS NÃO PREENCHIDOS
      let invalid: any = [];
      let answers: any[] = [];
      const controls = this.dynamicForm?.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
          console.log(name);
        }
      }

      console.log(invalid);
      invalid.forEach((element: any) => {
        console.log(element);
        this.items?.forEach((el: any) => {
          console.log(el.itemId);
          if (element == el.itemId) {
            answers.push({
              severity: 'error',
              summary: 'AVISO',
              detail: `CAMPO (${el.title}}) OBRIGATÓRIO`,
            });
          }
        });
      });
      //this.messageService.addAll(answers);
      //this.messages = [{ severity: 'error', summary: 'AVISO', detail: `${answers?.length} CAMPO(s) OBRIGATÓRIOS PENDENTES`}]
      this.messageService.addAll([
        {
          key: 'bc',
          severity: 'error',
          summary: 'AVISO',
          detail: `${answers?.length} CAMPO(s) OBRIGATÓRIOS PENDENTES`,
        },
      ]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickRadio($event: any) {
    console.log($event);
    let value = $event.value;

    if (value) {
      if (value == 'Não') {
      }
    }
  }

  open(id: string) {
    let formGroup: any = {};
    this.formservice
      .getFormById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: FormResponse) => {
          if (response) {
            //console.log(response);
            this.title = response.info?.title!;
            this.items = response.items!;
            this.form = response;
            response.items?.forEach((control, idx) => {
              let controlValidators: any[] = [];
              if (control.questionItem?.question.required == true) {
                if (control.itemId != '68bb5d0c') {
                  // radio
                  controlValidators.push(Validators.required);
                }
              }
              //console.log(control.itemId);
              formGroup[control.itemId as keyof typeof formGroup] = [
                control.value || '',
                controlValidators,
              ];
            });

            this.dynamicForm = this.formBuilder.group(formGroup);
            this.loadingGetForm = false;
            this.retrieveFormularios(id);
          }
        },
        error: (err) => {
          console.log(err);
          this.loadingGetForm = false;
        },
      });
  }

  checkType(item: any, type: any): string {
    let tipo = '';
    const keys = Object.keys(item.question) as Array<
      keyof typeof item.question
    >;
    keys.forEach((key) => {
      if (key === type) {
        let res = item.question[key];
        //console.log(res['paragraph']);
        if (res['paragraph'] !== undefined && res['paragraph'] == true) {
          tipo = 'text';
        } else {
          tipo = 'number';
        }
      } else {
        tipo = 'text';
      }
    });
    //console.log(tipo);
    return tipo;
  }

  onActiveItemChange(event: any) {
    if (event.value) {
      //console.log(event);
      let id = event.value.id;
      this.activeItem = event.value;
      //console.log(this.activeItem);
      this.dynamicForm = undefined;
      this.submitted = false;
      this.loadingGetForm = true;
      this.loadingGetList = true;
      this.open(id);
    } else {
      this.dynamicForm = undefined;
      this.loadingGetList = false;
      this.loadingGetForm = false;
      this.submitted = false;
    }
  }
}
