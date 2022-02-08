import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteImagesService {

  baseUrl = 'http://localhost/api/';

  constructor(private http: HttpClient) { }

  // all projects in db
  getImages() {
    
    return this.http.get(`${this.baseUrl}siteImages`).pipe(
      map( (res: any)  => {
        
        return res;
        
      })
    );
  }
}
