import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Admin } from 'src/app/shared/auth/admin';
import { AdminInfoService } from 'src/app/shared/auth/admin-info.service';
import { BackofficeStatsService } from 'src/app/shared/backoffice-stats.service';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.scss']
})
export class DeleteAdminComponent implements OnInit {

  admin: Admin[] = [];
  onlyAdmin = false;
  adminId: number = 0;

  error = "";
  adminsCount: number = 0;

  constructor(private authService: AuthService,
              private adminInfoService: AdminInfoService,
              private backofficeService: BackofficeStatsService,
              private route: Router) { }

  ngOnInit(): void {
    this.getStats();
    this.getAdmin();
  }

  getStats() {
    this.backofficeService.getStats().subscribe(
      data => {

        this.adminsCount = data[2][0].totalAdmins;
      }
    )
  }

  async getAdmin() {
    this.adminInfoService.adminInfo().subscribe(
      (data: Admin[]) => {
        
        this.admin = data;

        this.adminId = this.admin[0].admin_id!;
      
        // Condition if only admin in DB
        if( this.adminsCount <= 1) {

          this.onlyAdmin = true;
        }
        
        
      }
    );
  }

  removeAdmin(id: number) {
    this.adminInfoService.deleteAdmin(id).subscribe(
      data => {
         
        this.authService.logout();
        this.route.navigate(["/"]);

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


}
