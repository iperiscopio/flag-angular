import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FrontofficeService } from 'src/app/shared/frontoffice.service';
import { SiteImage } from 'src/app/shared/site-images';
import { SiteImagesService } from 'src/app/shared/site-images.service';

@Component({
  selector: 'app-ilheu-arquitects',
  templateUrl: './ilheu-arquitects.component.html',
  styleUrls: ['./ilheu-arquitects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IlheuArquitectsComponent implements OnInit {

  arqRita: string = "";
  arqAfonso: string = "";
  images: SiteImage[] = [];
  displayImage: string = ""

  constructor(private siteImageService: SiteImagesService,
              private frontofficeService: FrontofficeService) { }

  ngOnInit(): void {
    this.getAllInfo();
    this.getSiteImages();
  }

  getSiteImages() {
    this.siteImageService.getImages().subscribe(
      (data ) => {

        this.images = data;
        this.displayImage = this.images[1].image;
        
      }
    );
  }

  getAllInfo() {
    this.frontofficeService.getAllInfo().subscribe(
      data => {
        
        this.arqRita = data[2].info;
        this.arqAfonso = data[3].info;
        
      }
    )

  }
}
