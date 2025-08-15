import { Parametro, ParametroResponse } from './../models/param';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ProdResponse } from '../models/prodResponse';

interface IKeys { key1?: ProdResponse; key2?: Date[] }

@Injectable({
  providedIn: 'root'
})
export class GraphDataTransferService {

  public graphDataEmitter$ = new BehaviorSubject<IKeys>({})
  public graphDatas?: IKeys

  setGraphDatas(graph: ProdResponse, date: Date[]): void {

    let data = { key1: graph, key2: date }

    if (graph) {
      this.graphDataEmitter$.next(data)
      this.getGraphData()
     // console.log(graph)
    }
  }

  getGraphData() {
    this.graphDataEmitter$
    .pipe(
        take(1)
      //map((data) => data))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.graphDatas = response
          }
        }
      })

      return this.graphDatas
  }

}
