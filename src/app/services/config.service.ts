import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private http: HttpClient) {}

    getMunicipios(): Observable<any> {
        return this.http.get<any>('assets/data/municipios.json')
    }

    getUnidades(): Observable<any> {
      return this.http.get<any>('assets/data/unidades.json')
  }

}
