import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Info } from './web-information';

@Injectable({
  providedIn: 'root'
})
export class WebInformationService {

  baseUrl = 'http://localhost/api/';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");
  
  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };

  getAllInfo() {
    this.authService.checkExpToken(this.expToken);

    return this.http.get(`${this.baseUrl}information`, this.httpOptions).pipe(
      map( (res: any) => {
        
        return res;

        }
      )
    )
  }

  getInfo(id: number) {
    this.authService.checkExpToken(this.expToken);

    return this.http.get(`${this.baseUrl}information${id}`, this.httpOptions).pipe(
      map( (res: any) => {

        return res;

        }
      )
    )
  }

  postInfo(info: Info) {
    this.authService.checkExpToken(this.expToken);

    return this.http.post(`${this.baseUrl}information`, info, this.httpOptions).pipe(
      map( (res: any)  => {
       
        return res;
        
      })
    )
  }

  updateInfo( id: number, info: Info ) {
    this.authService.checkExpToken(this.expToken);

    return this.http.put(`${this.baseUrl}information/${id}`, info, this.httpOptions);
  }

  deleteInfo(id: number) {
    this.authService.checkExpToken(this.expToken);

    return this.http.delete(`${this.baseUrl}information/${id}`, this.httpOptions);
  }
}
