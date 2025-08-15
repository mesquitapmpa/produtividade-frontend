import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistrosDataTransferService {

  public registrosDataEmitter$ = new BehaviorSubject<Registro[]>([])
  public registrosDatas: Registro[] = []

  setRegistrosDatas(registros: Registro[]): void {

    if (registros) {
      this.registrosDataEmitter$.next(registros)
      this.getRegistrosData()
      console.log(registros)
    }
  }

  getRegistrosData() {
    this.registrosDataEmitter$
    .pipe(
        take(1)
      //map((data) => data))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.registrosDatas = response
          }
        }
      })

      return this.registrosDatas
  }

}
