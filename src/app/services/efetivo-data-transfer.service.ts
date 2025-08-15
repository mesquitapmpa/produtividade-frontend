import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Efetivo } from '../models/efetivo';

@Injectable({
  providedIn: 'root'
})
export class EfetivoDataTransferService {

  public efetivoDataEmitter$ = new BehaviorSubject<Efetivo[]>([])
  public efetivoDatas: Efetivo[] = []

  setEfetivoDatas(efetivo: Efetivo[]): void {

    if (efetivo) {
      this.efetivoDataEmitter$.next(efetivo)
      this.getEfetivoData()
      //console.log(efetivo)
    }
  }

  getEfetivoData() {
    this.efetivoDataEmitter$
    .pipe(
        take(1)
      //map((data) => data))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.efetivoDatas = response
          }
        }
      })
      return this.efetivoDatas
  }
}
