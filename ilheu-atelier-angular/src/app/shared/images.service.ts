import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Image } from './project-images';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  showImages: Image[] = [];

  baseUrl = 'http://localhost/api/';
  
  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");
  
  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };
  
  constructor(private http: HttpClient,
              private authService: AuthService) { }
              

  getAll() {
    this.authService.checkExpToken(this.expToken);

    return this.http.get<{ [key: string]: Image }>(`${this.baseUrl}images-manager`, this.httpOptions ).pipe(
      map( (res)  => {
        const imageArray: Image[] = [];        
        for (let key in res) {          
          if(res.hasOwnProperty(key)) {
            imageArray.push({...res[key] })
          }
        }
        
        return imageArray;
        
      })
    );
  }

  deleteImage(image: string) {
    this.authService.checkExpToken(this.expToken);
    
    return this.http.delete(`${this.baseUrl}images-manager/${image}`, this.httpOptions).pipe(
      map( (res)  => {
        
        return res;
        
      })
    );
  }

}
