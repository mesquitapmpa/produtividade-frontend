import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Form, FormResponse, FormReturn } from '../models/formResponse';


@Injectable({
    providedIn: 'root',
})
export class FormService {

    private API_URL = environment.API_URL
    private API_URL_TEST = environment.API_URL_TEST

    constructor(private http: HttpClient) { }

    getFormById(id: string): Observable<FormResponse> {
      //let queryParams = new HttpParams().append("init_date",requestData[0].toLocaleDateString())
      //                                  .append("end_date",requestData[1].toLocaleDateString())
      return this.http.get<FormResponse>(`${this.API_URL_TEST}/form/${id}`,{})
    }


    saveForm(requestData: Form): Observable<FormReturn> {
      //return this.http.post<Form>(`${this.API_URL_TEST}/sheet/${environment.SHEET_CPRIX_TEST}`, requestData)
      return this.http.post<FormReturn>(`${this.API_URL_TEST}/sheet`, requestData)
    }
}
