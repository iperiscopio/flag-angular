import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/shared/auth/auth.service';
import { Admin } from 'src/app/shared/auth/admin';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit, OnDestroy {

  adminLogin: Admin = {email: "", password: ""} as Admin;
  menuMobile: boolean = false;
  isAdminAuth: boolean = false;

  projectsCount: number = 0; 
  imagesCount: number = 0; 
  adminsCount: number = 0; 
  clientsCount: number = 0; 
  messagesCount: number = 0; 
  isLogout: boolean = false;

  error: string = "";

  isAdminAuthStorage = localStorage.getItem('isAdminAuth');
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");

  emitter!: Subscription;

  constructor(private authService: AuthService,
              private route: Router) { }


  ngOnInit(): void {
    
    if( this.isAdminAuthStorage === 'true') {
      this.isAdminAuth = true;
    } 
    this.emitter = this.authService.getEmitter().subscribe(
      (data) => {

        if(this.authService.checkExpToken(this.expToken)) {
          this.isAdminAuth = true;
        } else {
          
          this.isAdminAuth = false;
        }
      }
    )
    
  }


  loginAdmin(f: NgForm) {
    
    if(!f.value) {
      return;
    }
    const email = f.value.email;
    const password = f.value.password
    
    this.authService.login(email, password).subscribe(
      data => {
        
        this.isAdminAuth = true;
        f.reset();
        
      },
      HttpErrorResponse => {
        this.error = "";
        
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
      }
    )
  
  }

  toggleMenuMobile() {
    if (this.menuMobile === false) {
      this.menuMobile = true;
    } else {
      this.menuMobile = false;
    }
  }

  wantLogout() {
    this.isLogout = true;
  }

  cancel() {
    this.isLogout = false;
  }

  logout() {
    this.authService.logout();
    this.isAdminAuth = false;
    this.route.navigate(["/"]);
  }

  ngOnDestroy(): void {
    this.emitter.unsubscribe();
  }

}
