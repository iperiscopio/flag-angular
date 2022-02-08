import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ClientInfo } from './contactClients-model';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  baseUrl = 'http://localhost/api/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'image/png' })
  };


  generateCaptcha() {
    return this.http.get(`${this.baseUrl}captcha`, this.httpOptions).pipe(
      map( (res)  => {
        
        for (var [key, value] of Object.entries(res)) {
          
          let data = value;
          
         
          return data;

        }
        
      })
    );
  }

  sendMessage(message: ClientInfo) {
    return this.http.post(`${this.baseUrl}captcha`, message).pipe(
      map( (res: any)  => {
        
        return res;
        
      })
    );
  }
}
