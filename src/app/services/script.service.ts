import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse, DefaultResponseInterface } from '../model/default.response';
import { DeployResponse, DeployResponseInterface } from '../model/deploy.response';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ScriptResponse, ScriptResponseInterface } from '../model/script.response';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(
    private http: HttpClient,
  ) {
  }

  scriptList(): Observable<DefaultResponse<ScriptResponse[]>> {
    return this.http.get(`${environment.api_engine}/script`).pipe(
      map((response: DefaultResponseInterface<ScriptResponseInterface[]>) => {
        const scripts: ScriptResponse[] = response.data.map((x: ScriptResponseInterface) => new ScriptResponse(x));
        return new DefaultResponse({
          data: scripts,
          message: response.message,
          success: response.success,
        });
      })
    );
  }
}
