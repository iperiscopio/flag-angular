import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ClientInfo } from '../shared/contactClients-model';
import { SiteImage } from 'src/app/shared/site-images';
import { SiteImagesService } from 'src/app/shared/site-images.service';
import { CaptchaService } from '../shared/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  clients: ClientInfo[] = [];
  client: ClientInfo = {name: "", title: "", email: "", telephone: "", message: "", captcha: ""};
  submitted: boolean = false;

  images: SiteImage[] = [];
  displayImage: string = "";

  captcha: any;
  error = "";

  constructor(private siteImageService: SiteImagesService,
              private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.getSiteImages();
    this.genCaptcha();
  }

  getSiteImages() {
    this.siteImageService.getImages().subscribe(
      (data ) => {

        this.images = data;
        this.displayImage = this.images[1].image;
        
      }
    );
  }

  genCaptcha() {
    this.captchaService.generateCaptcha().subscribe(
      data => {
        
        this.captcha = `data:image/png;base64,${data}`;
      }    
    )
  }

  onSubmit(f: NgForm) {
    
    this.captchaService.sendMessage(this.client).subscribe(
      data => {
        
        this.clients.push(data);
        
        this.submitted = true;
        f.reset();
        return this.clients;

      }, 
      (HttpErrorResponse: any) => {
        this.error = "";
         
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }

        f.reset();
        
      }
    )
  }
}
