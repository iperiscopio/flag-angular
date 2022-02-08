import { Component, OnInit } from '@angular/core';
import { BackofficeStatsService } from 'src/app/shared/backoffice-stats.service';
import { Project } from 'src/app/shared/projects';
import { ProjectsBackofficeService } from 'src/app/shared/projects-backoffice.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  
  projectsCount: number = 0; 
  imagesCount: number = 0; 
  adminsCount: number = 0; 
  clientsCount: number = 0; 
  messagesCount: number = 0;

  allProjects: Project[] = [];
  error = "";

  constructor(private backofficeService: BackofficeStatsService,
              private projectBackofficeService: ProjectsBackofficeService) { }

  ngOnInit(): void {
    this.getStats();
    this.getProjects();
  }

  async getStats() {
    this.backofficeService.getStats().subscribe(
      data => {
        
        this.projectsCount = data[0][0].totalProjects; 
        this.imagesCount = data[1][0].totalImages; 
        this.adminsCount = data[2][0].totalAdmins; 
        this.clientsCount = data[3][0].totalClients; 
        this.messagesCount = data[4][0].totalMessages;
        
      }
    )
  }

  getProjects(): void {
    this.projectBackofficeService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.allProjects = data;
        
        
      }, error => {
        this.error = error.message;
        
      }
    );
  }

}
