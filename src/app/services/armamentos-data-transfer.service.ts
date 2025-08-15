import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Registro } from '../models/registro';
import { Armamento } from '../models/armamento';

@Injectable({
  providedIn: 'root'
})
export class ArmamentosDataTransferService {

  public armamentosDataEmitter$ = new BehaviorSubject<Armamento[]>([])
  public armamentosDatas: Armamento[] = []

  setArmamentosDatas(armamentos: Armamento[]): void {

    if (armamentos) {
      this.armamentosDataEmitter$.next(armamentos)
      this.getArmamentosData()
      console.log(armamentos)
    }
  }

  getArmamentosData() {
    this.armamentosDataEmitter$
    .pipe(
        take(1)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.armamentosDatas = response
          }
        }
      })

      return this.armamentosDatas
  }

}
