import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parametro } from '../models/param';
import { Efetivo, EfetivoResponse } from '../models/efetivo';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class EfetivoService {

    private API_URL = environment.API_URL
    private API_URL_TEST = environment.API_URL_TEST

    constructor(private http: HttpClient) { }

   
    getEfetivo(): Observable<EfetivoResponse> {

     
      let queryParams = new HttpParams().append("idunidade",78)
                                        .append("types",'unidade')
                                        .append("search",78)
                                        .append("limit",500)
                                        .append("page",1)
                                        //.append("myPermitions[]",8)
                                        //.append("myPermitions[]",16)

      return this.http.get<EfetivoResponse>(`${this.API_URL_TEST}/listaefetivo`,{params:queryParams})

    }


    updateEfetivo(requestData: Efetivo): Observable<Efetivo> {
      return this.http.put<Efetivo>(`${this.API_URL_TEST}/efetivo/${requestData.id}`, requestData)
    }


    deleteEfetivo(requestData: Efetivo): Observable<Efetivo> {
      return this.http.delete<Efetivo>(`${this.API_URL_TEST}/efetivo/${requestData.id}`)
    }


}
