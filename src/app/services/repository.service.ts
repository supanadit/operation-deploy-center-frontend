import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse, DefaultResponseInterface } from '../model/default.response';
import { GitResponse, GitResponseInterface } from '../model/git.response';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  gitList(): Observable<DefaultResponse<GitResponse[]>> {
    return this.http.get(`${environment.api_engine}/git`).pipe(
      map((response: DefaultResponseInterface<GitResponseInterface[]>) => {
        const git: GitResponse[] = response.data.map((x: GitResponseInterface) => new GitResponse(x));
        return new DefaultResponse({
          data: git,
          message: response.message,
          success: response.success,
        });
      })
    );
  }

  gitSave(git: GitResponseInterface): Observable<DefaultResponse<any>> {
    return this.http.post(`${environment.api_engine}/git/save`, git, {
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
