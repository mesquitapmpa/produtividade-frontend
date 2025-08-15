import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parametro } from '../models/param';
import { Efetivo, EfetivoResponse } from '../models/efetivo';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ProdResponse } from '../models/prodResponse';


@Injectable({
    providedIn: 'root',
})
export class HomeService {

    private API_URL = environment.API_URL
    private API_URL_TEST = environment.API_URL_TEST

    constructor(private http: HttpClient) { }

    getInfoProdCpr(requestData: Date[]): Observable<ProdResponse> {

      let queryParams = new HttpParams().append("init_date",requestData[0].toLocaleDateString())
                                        .append("end_date",requestData[1].toLocaleDateString())
      return this.http.get<ProdResponse>(`${this.API_URL_TEST}/sheet`,{params:queryParams})
    }
}
