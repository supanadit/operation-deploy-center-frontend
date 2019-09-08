import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse, DefaultResponseInterface } from '../model/default.response';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DeployResponseInterface } from '../model/deploy.response';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private http: HttpClient,
  ) {
  }

  fromHistory(request: DeployResponseInterface): Observable<DefaultResponse<any>> {
    return this.http.post(`${environment.api_engine}/standard/deploy`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map((response: DefaultResponseInterface<any>) => {
        return new DefaultResponse(response);
      })
    );
  }

  standardDeploy(request: DeployResponseInterface): Observable<DefaultResponse<any>> {
    return this.http.post(`${environment.api_engine}/standard/deploy`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map((response: DefaultResponseInterface<any>) => {
        return new DefaultResponse(response);
      })
    );
  }

  scriptDeploy(request: DeployResponseInterface): Observable<DefaultResponse<any>> {
    return this.http.post(`${environment.api_engine}/script/deploy`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map((response: DefaultResponseInterface<any>) => {
        return new DefaultResponse(response);
      })
    );
  }
}
