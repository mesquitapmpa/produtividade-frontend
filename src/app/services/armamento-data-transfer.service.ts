import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArmamentoDataTransferService {

  public armamentosDataEmitter$ = new BehaviorSubject<any>(null)
  public armamentosDatas: any

  setArmamentoDatas(armamentos: any): void {

      console.log(armamentos)
      this.armamentosDataEmitter$.next(armamentos)
      this.getArmamentoData()
      //console.log(armamentos)

  }

  getArmamentoData() {
    this.armamentosDataEmitter$
    .pipe(
        take(1)
      //map((data) => data))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.armamentosDatas = response
            //console.log(response)
            //console.log(this.armamentosDatas)
          }
        }
      })

      return this.armamentosDatas
  }

}
