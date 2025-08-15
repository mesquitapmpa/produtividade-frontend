import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro, RegistroResponse } from '../models/registro';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class RegistroService {

    private API_URL = environment.API_URL_TEST

    constructor(private http: HttpClient) { }

    getRegistros(): Observable<RegistroResponse> {
        return this.http.get<RegistroResponse>(`${this.API_URL}/registros`, {})
    }


    saveRegistro(requestData: Registro): Observable<Registro> {
      return this.http.post<Registro>(`${this.API_URL}/registro/add`, requestData)
    }


    deleteRegistro(requestData: Registro): Observable<Registro> {
      return this.http.delete<Registro>(`${this.API_URL}/registro/${requestData.code}`)
    }


    updateRegistro(requestData: Registro): Observable<Registro> {
      return this.http.put<Registro>(`${this.API_URL}/registro/${requestData.code}`, requestData)
    }


    updateRelatorio(requestData: Registro): Observable<Registro> {
      return this.http.put<Registro>(`${this.API_URL}/relatorio/${requestData.code}`, requestData)
    }

}
