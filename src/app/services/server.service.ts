import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse, DefaultResponseInterface } from '../model/default.response';
import { SSHResponse, SSHResponseInterface } from '../model/ssh.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient,
  ) {
  }

  sshList(): Observable<DefaultResponse<SSHResponse[]>> {
    return this.http.get(`${environment.api_engine}/ssh`).pipe(
      map((response: DefaultResponseInterface<SSHResponseInterface[]>) => {
        const ssh: SSHResponse[] = response.data.map((x: SSHResponseInterface) => new SSHResponse(x));
        const defaultResponse: DefaultResponse<SSHResponse[]> = new DefaultResponse({
          data: ssh,
          message: response.message,
          success: response.success,
        });
        return defaultResponse;
      })
    );
  }

  save(ssh: SSHResponse): Observable<DefaultResponse<any>> {
    return this.http.post(`${environment.api_engine}/ssh/save`, ssh, {
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
