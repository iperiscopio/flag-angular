import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackofficeStatsService {

  baseUrl = 'http://localhost/api/';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");
  
  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };

  getStats() {
    this.authService.checkExpToken(this.expToken);
    
    return this.http.get(`${this.baseUrl}backoffice`, this.httpOptions).pipe(
      map( (res: any)  => {
       
        return res;
        
      })
    );
  }
}
