import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroDataTransferService {

  public registroDataEmitter$ = new BehaviorSubject<Registro>({})
  public registro: Registro = {}

  setRegistro(registro: Registro): void {

    if (registro) {
      this.registroDataEmitter$.next(registro)
      this.getRegistro()
      console.log(registro)
    }
  }

  getRegistro() {
    this.registroDataEmitter$
    .pipe(
        take(1)
      //map((data) => data))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.registro = response
          }
        }
      })

      return this.registro
  }

}
