import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsGoogleRoutingModule } from './forms-google-routing.module';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckExistFormPipe } from 'src/app/directives/checkifexistform';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

// Modern Angular Fire imports
//import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
//import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//import { getAuth, provideAuth } from '@angular/fire/auth';
//import { getStorage, provideStorage } from '@angular/fire/storage';
//import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from 'src/app/environments/environment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ProgressBarModule } from 'primeng/progressbar';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [DynamicFormComponent, CheckExistFormPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsGoogleRoutingModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    MultiSelectModule,
    AngularFireModule.initializeApp(environment.FIREBASE),
    AngularFireDatabaseModule,
    ProgressBarModule,
    DataViewModule,
    ToastModule,
    DialogModule,
    MessagesModule
  ],
  providers: []
})
export class FormsGoogleModule { }
