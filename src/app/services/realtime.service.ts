import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperationResponse, OperationResponseInterface } from '../model/operation.response';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private socket: Socket) {
  }

  getOperation(): Observable<OperationResponse[]> {
    this.socket.emit('get-operation');
    return this.socket.fromEvent<OperationResponse[]>('operation').pipe(
      map<any, any>((data: string) => {
        const list: OperationResponseInterface[] = JSON.parse(data);
        return list.map((x: OperationResponseInterface) => {
          return new OperationResponse(x);
        });
      })
    );
  }
}
