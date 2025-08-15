import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Ranking } from '../models/ranking';


@Injectable({
    providedIn: 'root',
})
export class RankingService {

    private API_URL = environment.API_URL_TEST

    constructor(private http: HttpClient) { }

    getRanking(requestData: Date[]): Observable<Ranking[]> {
      let queryParams = new HttpParams().append("init_date",requestData[0].toISOString())
                                        .append("end_date",requestData[1].toISOString())
        return this.http.get<Ranking[]>(`${this.API_URL}/ranking`, {params: queryParams})
    }

    getRankingByIdPessoa(idpessoa: number, requestData: Date[]): Observable<Ranking[]> {
      let queryParams = new HttpParams().append("init_date",requestData[0].toISOString())
                                        .append("end_date",requestData[1].toISOString())
        return this.http.get<any[]>(`${this.API_URL}/ranking/${idpessoa}`, {params: queryParams})
    }


}
