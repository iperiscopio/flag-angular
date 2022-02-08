import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Project } from 'src/app/shared/projects';
import { ProjectsBackofficeService } from 'src/app/shared/projects-backoffice.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projects: Project[] = [];
  project: Project = {title: "", location: "", description: "", images: []};

  imageValue?: any;

  submitted = false;

  error = "";
  err = false;

  public Editor = ClassicEditor;

  constructor(private backofficeProjectService: ProjectsBackofficeService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.backofficeProjectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
        
        
      }, error => {
        this.error = error.message;
        
      }
    );
  }

// FUNCTION TO SELECT FILES:
  onSelectedFile(event: any) {

    for(let i = 0; i < event.target.files.length; i++) {
      
      let results = this;
      let file = event.target.files[i];

      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = function () {

        results.imageValue = reader.result;

        // start str replace  eg: data:image/svg+xml;base64,
        let index = results.imageValue.indexOf(",");
        let slice = results.imageValue.slice(0, index+1);
        results.imageValue = results.imageValue.replace(slice, "");
        // end str replace
        
        results.project.images.push(results.imageValue)
        
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      
    };
    
    return this.project.images;
  }

  
  // FUNCTION TO ADD A PROJECT TO DB:
  addProject(f: NgForm) { 
           
    this.backofficeProjectService.createProject(this.project).subscribe(
      (data: Project) => {
        
        this.projects.push(data);

        this.submitted = true;
                
        this.getProjects();

        f.reset();
        return this.projects;
      }, 
      (HttpErrorResponse: any) => {
         
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }

        this.err = true;
        
      }
    )
  }

}
