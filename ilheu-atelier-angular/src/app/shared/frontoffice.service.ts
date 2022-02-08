import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Project } from './projects';

@Injectable({
  providedIn: 'root'
})

export class FrontofficeService {

  showProjects: Project[] = [];

  baseUrl = 'http://localhost/api/';

  
  constructor(private http: HttpClient) { }
  

  // all projects with images
  getProjects() {
    
    return this.http.get<{ [key: string]: Project }>(`${this.baseUrl}projects`).pipe(
      map( (res)  => {
        const projectsArray: Project[] = [];        
        for (let key in res) {          
          if(res.hasOwnProperty(key)) {
            projectsArray.push({...res[key] })
          }
        }
        return projectsArray;
        
      })
    );
  }

  getProject(id:any) {
   
    return this.http.get<{ [key: string]: Project }>(`${this.baseUrl}projects/${id}`).pipe(
      map( (res)  => {
        
        const projectArray: Project[] = [];        
        for (let key in res) {          
          if(res.hasOwnProperty(key)) {
            projectArray.push({...res[key]})
          }
        }
        return projectArray;
        
      })
    );
  }

  getAllInfo() {

    return this.http.get(`${this.baseUrl}information`).pipe(
      map( (res: any) => {
        
        return res;

        }
      )
    )
  }


}
