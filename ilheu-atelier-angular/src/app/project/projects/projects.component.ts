import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Project } from '../../shared/projects';
import { FrontofficeService } from '../../shared/frontoffice.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {

  allProjects: Project[] = [];

  constructor(private frontofficeService: FrontofficeService) { }

  ngOnInit(): void {
    this.getProjects();
    
  }

  getProjects(): void {
    this.frontofficeService.getProjects().subscribe(
      (data: Project[]) => {

        this.allProjects = data;
        
      }
    );
  }

}
