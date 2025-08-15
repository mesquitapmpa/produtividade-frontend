import { Injectable } from '@angular/core';
import { Form } from '../models/formResponse';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    private dbPath = '/formularios';

    formulariosRef: AngularFireList<Form>;

    constructor(private db: AngularFireDatabase) {
      this.formulariosRef = db.list(this.dbPath);
    }

    getAll(): AngularFireList<Form> {
      return this.formulariosRef;
    }

    getAllById(formid: string): AngularFireList<Form> {
      return this.db.list(this.dbPath, ref => ref.limitToLast(500).orderByChild('formId').equalTo(formid));
      //return this.db.list(this.dbPath, ref => ref.orderByChild('formId').equalTo(formid));
    }

    create(tutorial: Form): any {
      return this.formulariosRef.push(tutorial);
    }

    update(key: string, value: any): Promise<void> {
      return this.formulariosRef.update(key, value);
    }

    delete(key: string): Promise<void> {
      return this.formulariosRef.remove(key);
    }

    deleteAll(): Promise<void> {
      return this.formulariosRef.remove();
    }
}
