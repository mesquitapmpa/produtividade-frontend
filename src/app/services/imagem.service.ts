import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Armamento, ArmamentoResponse } from '../models/armamento';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagemService {
  private API_URL = environment.API_URL_TEST;
  constructor(private http: HttpClient) {}

  getAll(code: string, model: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/imagem/${model}/upload/${code}`);
  }

  pushFileToStorage(files: File[], id: string, model: string): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    return this.http.post<any>(
      `${this.API_URL}/imagem/${model}/upload/${id}`,formData, {
        reportProgress: true,
        observe: "events"
      });
  }

  delete(imagem: any, model: string): Observable<any> {
    return this.http.delete<any>(
      `${this.API_URL}/imagem/${model}/upload/${imagem.code}`
    );
  }
}
