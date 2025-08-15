import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parametro, ParametroResponse } from '../models/param';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ParametroService {

    private API_URL = environment.API_URL_TEST

    constructor(private http: HttpClient) { }

    getParametros(): Observable<ParametroResponse> {
        //return this.http.get<ParametroResponse>('assets/data/parametros.json')
        return this.http.get<ParametroResponse>(`${this.API_URL}/parametros`, {})
    }

    updateParametro(requestData: Parametro): Observable<Parametro> {
      return this.http.put<Parametro>(`${this.API_URL}/parametro/${requestData.code}`, requestData)
    }


    saveParametro(requestData: Parametro): Observable<Parametro> {
      return this.http.post<Parametro>(`${this.API_URL}/parametro/add`, requestData)
    }





}
