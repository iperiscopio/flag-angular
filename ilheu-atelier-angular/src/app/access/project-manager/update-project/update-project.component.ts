import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Image } from 'src/app/shared/project-images';
import { ImagesService } from 'src/app/shared/images.service';

import { Project } from 'src/app/shared/projects';
import { ProjectsBackofficeService } from 'src/app/shared/projects-backoffice.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  allProjects: Project[] = [];
  allImages: Image[] = [];

  projectUpdate: Project = {project_id: 0, title: "", location: "", description: "", images: []};
  

  imageValue?: any;
  
  submitted = false;
  selectedId = false;
  selectedImages = false;

 
  error = "";
  err = false;
  formId: number = 0;
  formImages: string[] = [""];

  public Editor = ClassicEditor;

  constructor(private backofficeProjectService: ProjectsBackofficeService,
              private imagesService: ImagesService) { }

  ngOnInit(): void {
    
    this.getProjects();
    this.getImages();
    
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

  getImages() {
    this.imagesService.getAll().subscribe(
      (data: Image[]) => {
        this.allImages = data;

        if(this.selectedImages = true) {
          this.updateArrayImages(this.formId);
        }

        
      }, error => {
        this.error = error.message;
        
      }
    )
  }

  selectedProject(project: Project) {

    if(project.project_id) {

      this.selectedId = true;
      this.selectedImages = false;
      this.submitted = false;

      this.projectUpdate.project_id = project.project_id;
      this.projectUpdate.title = project.title;
      this.projectUpdate.location = project.location;
      this.projectUpdate.description = project.description;

      for(let i= 0; i < this.allImages.length; i++) {

        if(project.project_id === this.allImages[i].project_id) {
          
          this.formImages = this.allImages[i].images;
          this.selectedImages = true;
        } 
        
      }
      
      this.formId = this.projectUpdate.project_id;
      
      return this.formId, this.formImages;
    }

    return 0;
  }

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

        results.projectUpdate.images.push(results.imageValue)
        
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      
    };
    
    return this.projectUpdate.images;
  }

  updateArrayImages(formId: number) {

    this.selectedImages = false;
    this.formImages = [""];

    for(let i= 0; i < this.allImages.length; i++) {

      if(formId === this.allImages[i].project_id) {
        
        
        if(this.allImages[i].images.length < 1 ) {

          this.selectedImages = false;

        } else {

          this.formImages = this.allImages[i].images;
          this.selectedImages = true;

        }
      } 
    }
  
    return this.formImages;
  }


  deleteImage(image: string) {

    this.imagesService.deleteImage(image).subscribe(
      (data) => {  
        this.getImages();
        this.getProjects();
        
      },
      HttpErrorResponse => {
         
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
      }
    );

    
  }

  changeProject(id: number, f: NgForm) {  
   
    this.backofficeProjectService.updateProject(id, this.projectUpdate).subscribe(
        data => {
          
          this.submitted = true;
          this.selectedImages = false;
          f.reset();
          this.getProjects();
          this.getImages();

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
