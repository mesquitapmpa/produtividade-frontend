import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Armamento, ArmamentoResponse } from '../models/armamento';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ArmamentoDBService {

    private API_URL = environment.API_URL_TEST

    constructor(private http: HttpClient) { }

    getAll(): Observable<ArmamentoResponse> {
        return this.http.get<ArmamentoResponse>(`${this.API_URL}/armamentos`, {})
    }

    save(requestData: any): Observable<Armamento> {
      return this.http.post<Armamento>(`${this.API_URL}/armamento/add`, requestData)
    }

    delete(requestData: any): Observable<any> {
      return this.http.delete<any>(`${this.API_URL}/armamento/${requestData.code}`)
    }

    update(requestData: any): Observable<Armamento> {
      return this.http.put<Armamento>(`${this.API_URL}/armamento/${requestData.code}`, requestData)
    }

}
