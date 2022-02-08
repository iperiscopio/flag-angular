import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Admin } from './admin';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminInfoService {

  baseUrl = 'http://localhost/api/';

  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");

  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  
  adminInfo() {
    this.authService.checkExpToken(this.expToken);
    
    return this.http.get<Admin>(`${this.baseUrl}accounts-manager/`, this.httpOptions ).pipe(
      map( (res: any)  => {
       
        return res;
        
      })
    );
  }

  register(admin: Admin) {
    this.authService.checkExpToken(this.expToken);
    
    return this.http.post<Admin>(`${this.baseUrl}accounts-manager`, admin, this.httpOptions).pipe(
      map( (res: any)  => {
       
        return res;
        
      })
    );
  }

  updateAdmin(id: number, admin: Admin) {
    this.authService.checkExpToken(this.expToken);

    return this.http.put(`${this.baseUrl}accounts-manager/${id}`, admin, this.httpOptions );

  }

  deleteAdmin(id: number) {
    this.authService.checkExpToken(this.expToken);

    return this.http.delete(`${this.baseUrl}accounts-manager/${id}`, this.httpOptions );
    
  }
  
}
