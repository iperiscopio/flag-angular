import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost/api/';

  isAdminAuth!: boolean;

  constructor(private http: HttpClient,
              private route: Router) { }
          
              
  // Token and function to check if token expired
  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");
  
  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };

  checkExpToken(expToken: number) {
   
    if(Date.now() >= expToken * 1000) {
      this.isAdminAuth = false;
      this.logout();
      this.route.navigate(["/"]);

      return false;
      
    } else {
      this.isAdminAuth = true;
      return true;
    }
  }
  // end

  login(email: string, password: string) {
    
    return this.http.post<Admin>(`${this.baseUrl}login`, { email: email, password: password }).pipe(
      map( res => {
        localStorage.setItem('access_token', res.token ?? "");        
        localStorage.setItem('isAdminAuth', 'true');        
        localStorage.setItem('exp_token', JSON.stringify(res.exp) );
        this.isAdminAuth = true;
        this.fireIsLoggedIn.emit(true);   
        this.expToken = parseInt(localStorage.getItem('exp_token') ?? "");
        return res;
      }));

  }

  @Output() fireIsLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  getEmitter() {     
    return this.fireIsLoggedIn; 
  }
  
  
  logout() {
    this.fireIsLoggedIn.emit(false);
    this.isAdminAuth = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('isAdminAuth');
    localStorage.removeItem('exp_token');


  }

}
