import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Project } from './projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsBackofficeService {

  showProjects: Project[] = [];

  baseUrl = 'http://localhost/api/';

  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");

  
  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  // all projects in db
  getAllProjects() {
    this.authService.checkExpToken(this.expToken);
    
    return this.http.get<{ [key: string]: Project }>(`${this.baseUrl}projects-manager`, this.httpOptions ).pipe(
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

  createProject(project: Project) {
    this.authService.checkExpToken(this.expToken);

    return this.http.post(`${this.baseUrl}projects-manager`, project, this.httpOptions ).pipe(
      map( (res: any)  => {
       
        return res;
        
      })
    );
  }

  updateProject(id: number, project: Project) {
    this.authService.checkExpToken(this.expToken);

    return this.http.put(`${this.baseUrl}projects-manager/${id}`, project, this.httpOptions );

  }

  deleteProject(id: number) {
    this.authService.checkExpToken(this.expToken);

    return this.http.delete(`${this.baseUrl}projects-manager/${id}`, this.httpOptions).pipe(
      map( (res)  => {
        
        return res;
        
      })
    );
    
  }
}
