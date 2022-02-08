import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Admin } from 'src/app/shared/auth/admin';
import { AdminInfoService } from 'src/app/shared/auth/admin-info.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss']
})
export class UpdateAdminComponent implements OnInit {

  admin: Admin[] = [];
  newAdmin : Admin = {name: "", email: "", password: "", username: "", confirm_password: ""};
  id: number = 0;

  submitted = false;
  err = false;
  passErr = false;
  error = '';

  constructor(private authService: AuthService,
              private adminInfoService: AdminInfoService) { }

  ngOnInit() {
    this.getAdmin();
  }

  getAdmin() {
    this.adminInfoService.adminInfo().subscribe(
      (data: Admin[]) => {
        
        this.admin =  data;
        this.newAdmin.name = this.admin[0].name;
        this.newAdmin.email = this.admin[0].email;
        this.newAdmin.username = this.admin[0].username;
        this.id = this.admin[0].admin_id!;
        
      }
    );
  }

  updateAdmin(id: number, f:NgForm) {
    
    if( f.value.password === f.value.confirmPassword ) {
      this.adminInfoService.updateAdmin(id, this.newAdmin).subscribe(
        data => {

          this.submitted = true;

          f.reset();

        },
        HttpErrorResponse => {
          
          if( HttpErrorResponse.status >= 422 ) {

            this.error = HttpErrorResponse.error.message;
            
          } else {

            this.error = HttpErrorResponse.error.message;

          }

          this.err = true; 
          
        }
      )
    } else {
      this.passErr = true;
    }
  }
    
    

}
