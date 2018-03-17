import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  executeSQLtoLocal(sql: string) {
    return this.http.get('/local', {
      params: {
        sql: sql
      }
    }).toPromise();
  }

  executeSQLtoDistributed(sql: string) {
    return this.http.get('/hive', {
      params: {
        sql: sql
      }
    }).toPromise();
  }
}
