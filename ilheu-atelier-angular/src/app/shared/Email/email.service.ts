import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl = 'http://localhost/api/';

  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");
  
  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };
  
  constructor(private http: HttpClient,
              private authService: AuthService) { }


  sendEmail(message: Email) {
    this.authService.checkExpToken(this.expToken);
    
    return this.http.post(`${this.baseUrl}sendEmail`, message, this.httpOptions ).pipe(
      map( (res: any)  => {
        
        return res;
        
      })
    );
  }
}
