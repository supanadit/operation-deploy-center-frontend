import { Injectable } from '@angular/core';
import { GitResponseInterface } from '../model/git.response';
import { Observable } from 'rxjs';
import { DefaultResponse, DefaultResponseInterface } from '../model/default.response';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SSHResponse } from '../model/ssh.response';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private http: HttpClient,
  ) {
  }

  // tslint:disable-next-line:max-line-length
  standardDeploy(git: GitResponseInterface, ssh: SSHResponse, targetDirectory: string = '/', targetCompressDirectory: string = '/'): Observable<DefaultResponse<any>> {
    const request = {
      ssh: {
        host: ssh.host,
      },
      git: {
        url: git.url
      },
      target: targetDirectory,
      targetCompress: targetCompressDirectory,
    };
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
}
