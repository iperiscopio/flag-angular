import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = "Ilhéu";

  menuMobile: boolean = false;

  isAdminAuth = false;

  expToken = parseInt(localStorage.getItem('exp_token') ?? "");

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.authService.getEmitter().subscribe(
      (data) => {
        if(this.authService.checkExpToken(this.expToken) && data === true) {
          this.isAdminAuth = data;
        } else {
          this.isAdminAuth = false;
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

}
