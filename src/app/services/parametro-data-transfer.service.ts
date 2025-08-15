import { Parametro, ParametroResponse } from './../models/param';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametroDataTransferService {

  public parametrosDataEmitter$ = new BehaviorSubject<Parametro[]>([])
  public parametrosDatas: Parametro[] = []

  setParametrosDatas(parametros: Parametro[]): void {

    if (parametros) {
      this.parametrosDataEmitter$.next(parametros)
      this.getParametrosData()
     // console.log(parametros)
    }
  }

  getParametrosData() {
    this.parametrosDataEmitter$
    .pipe(
        take(1)
      //map((data) => data))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.parametrosDatas = response
          }
        }
      })

      return this.parametrosDatas
  }

}
