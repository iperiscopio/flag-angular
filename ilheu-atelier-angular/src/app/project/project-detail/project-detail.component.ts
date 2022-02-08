import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../shared/projects';
import { FrontofficeService } from '../../shared/frontoffice.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {

  projectById: Project[] = [];
  description: boolean = false;
  currentImage: string = "";
  currentImageNumber: number = 0;
  
  constructor(private frontofficeService: FrontofficeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
    
    this.getProjectById(id);
    
  }

  getProjectById(id:string): void {
    this.frontofficeService.getProject(id).subscribe(
      (data: Project[]) => {
        
        this.projectById = data;
        this.currentImage = this.projectById[0].images[this.currentImageNumber];

        return this.projectById;
        
      }
    );
  }

  onShowGallery(){
    const next = this.currentImageNumber + 1;
    this.currentImage = this.projectById[0].images[this.currentImageNumber];
    
    this.currentImageNumber = next === this.projectById[0].images.length ? 0 : next;
  }
   
  onShowDescription() {
    if(this.description == false){
      this.description = true;
    } else {
      this.description = false;
    } ;
  }  
}


