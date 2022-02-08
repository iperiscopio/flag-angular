import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Admin } from 'src/app/shared/auth/admin';
import { AdminInfoService } from 'src/app/shared/auth/admin-info.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  admins: Admin[] = [];
  admin: Admin = {name: "", email: "", password: "", username: ""};

  submitted = false;
  err = false;
  error = "";

  constructor(private adminInfoService: AdminInfoService) { }

  ngOnInit(): void {
  }

  addAdmin(f: NgForm) {
    this.admin = f.value;
    
    this.adminInfoService.register(this.admin).subscribe(
      (data: Admin) => {
        
        this.admins.push(data);

        this.submitted = true;
        f.reset();
        
        return this.admins;
      }, 
      HttpErrorResponse => {
         
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
        this.err = true;

        f.reset();
        
      }
    );
  }
}
