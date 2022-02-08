import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrontofficeService } from 'src/app/shared/frontoffice.service';
import { SiteImage } from 'src/app/shared/site-images';
import { SiteImagesService } from 'src/app/shared/site-images.service';

@Component({
  selector: 'app-ilheu-atelier',
  templateUrl: './ilheu-atelier.component.html',
  styleUrls: ['./ilheu-atelier.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IlheuAtelierComponent implements OnInit {

  atelierPt: string = "";
  atelierEn: string = "";
  images: SiteImage[] = [];
  displayImage: string = "";

  constructor(private siteImageService: SiteImagesService,
              private frontofficeService: FrontofficeService) { }
  

  ngOnInit(): void {
    this.getAllInfo();
    this.getSiteImages();
  }

  getSiteImages() {
    this.siteImageService.getImages().subscribe(
      (data) => {

        this.images = data;
        this.displayImage = this.images[0].image;
        
      }
    );
  }

  getAllInfo() {
    this.frontofficeService.getAllInfo().subscribe(
      data => {

        this.atelierPt = data[0].info;
        this.atelierEn = data[1].info;
        
      }
    )

  }

  

}
