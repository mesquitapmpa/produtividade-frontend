import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
    providedIn: 'root',
})
export class ArmamentoService {

    private dbPath = '/armamentos';

    armamentosRef: AngularFireList<any>;

    constructor(private db: AngularFireDatabase) {
      this.armamentosRef = db.list(this.dbPath);
    }

    getAll(): AngularFireList<any> {
      return this.armamentosRef;
    }

    getAllById(unidade: string): AngularFireList<any> {
      //return this.db.list(this.dbPath, ref => ref.limitToLast(500).orderByChild('unidade').equalTo(unidade));
      return this.db.list(this.dbPath, ref => ref.orderByChild('unidade').equalTo(unidade));
    }

    create(armamento: any): any {
      return this.armamentosRef.push(armamento);
    }

    update(key: string, value: any): Promise<void> {
      return this.armamentosRef.update(key, value);
    }

    delete(key: string): Promise<void> {
      return this.armamentosRef.remove(key);
    }

    deleteAll(): Promise<void> {
      return this.armamentosRef.remove();
    }
}
