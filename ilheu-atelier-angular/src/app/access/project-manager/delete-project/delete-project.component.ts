import { Component, OnInit } from '@angular/core';

import { Project } from 'src/app/shared/projects';
import { ProjectsBackofficeService } from 'src/app/shared/projects-backoffice.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  allProjects: Project[] = [];

  projectDelete: Project = {title: "", location: "", description: "", images: []};


  submitted = false;
  selectedId = false;

  formId: number = 0;
  formTitle: string = "";

  error = "";
  err = false;

  constructor(private backofficeProjectService: ProjectsBackofficeService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.backofficeProjectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.allProjects = data;

      }, error => {
        this.error = error.message;
        
      }
    );
  }

  selectedProject(project: Project) {
    if(project.project_id) {
      this.submitted = false;
      this.selectedId = true;

      this.formId = project.project_id;
      this.formTitle = project.title;
      
      return this.formId;
    }

    return 0;
  }

  cancel() {
    this.selectedId = false;
  }
  
  
  removeProject(formId: number) {
    
    this.backofficeProjectService.deleteProject(formId).subscribe(
      (data) => {        
        this.allProjects = this.allProjects.filter( function (item) {
          return item['project_id'] && +item['project_id'] !== +formId;
        });

        this.submitted = true;
        formId = 0;
        
        this.getProjects();

      },
      HttpErrorResponse => {
         
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
        this.err = true;
        
      }
    );
    
    
  }

}


