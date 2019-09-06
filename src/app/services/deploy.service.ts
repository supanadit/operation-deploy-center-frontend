import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse, DefaultResponseInterface } from '../model/default.response';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { DeployResponse, DeployResponseInterface } from '../model/deploy.response';

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  constructor(
    private http: HttpClient,
  ) {
  }

  historyList(): Observable<DefaultResponse<DeployResponse[]>> {
    return this.http.get(`${environment.api_engine}/deploy/history`).pipe(
      map((response: DefaultResponseInterface<DeployResponseInterface[]>) => {
        const deploy: DeployResponse[] = response.data.map((x: DeployResponseInterface) => new DeployResponse(x));
        return new DefaultResponse({
          data: deploy,
          message: response.message,
          success: response.success,
        });
      })
    );
  }
}
