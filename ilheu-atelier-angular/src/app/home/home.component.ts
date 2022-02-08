import { Component, OnInit, OnDestroy } from '@angular/core';


import { Project } from '../shared/projects';
import { FrontofficeService } from '../shared/frontoffice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  
  currentImage: string = "";
  currentTitle: string = "";
  currentLocation: string = "";
  showProjects: Project[] = [];
  newProjects: Project[] = [];
  pos: number = 0;
  interval: any;
  error = null;


  constructor(private frontofficeService: FrontofficeService) { }


  ngOnInit(): void {

    this.getProjects();
    
    this.interval = setInterval( ()=> { this.onNextImage() }, 5000);
    
  }
  

  getProjects() {

      this.frontofficeService.getProjects().subscribe(
        (data: Project[]) => {
          
          this.showProjects = data;
          this.onNextImage();
          
        }, error => {
          this.error = error.message;
          
        }
      );
    
  }

  onNextImage(){
    
    if (this.pos > this.showProjects.length - 1) {
      this.pos = 0;
    }
    
    this.info();
    this.pos++;
  };
    
    
  private info() {

    this.currentImage = this.showProjects[this.pos].images[0];
    this.currentTitle = this.showProjects[this.pos].title;
    this.currentLocation = this.showProjects[this.pos].location;

  }
  

  
  

  ngOnDestroy(){
    clearInterval(this.interval);
  }
         
}

