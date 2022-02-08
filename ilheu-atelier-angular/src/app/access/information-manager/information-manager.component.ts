import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Info } from 'src/app/shared/web-information';
import { WebInformationService } from 'src/app/shared/web-information.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-information-manager',
  templateUrl: './information-manager.component.html',
  styleUrls: ['./information-manager.component.scss']
})
export class InformationManagerComponent implements OnInit {

  
  information: Info[] = [];
  newInfo: Info = {info_id: 0, title: "", info: ""};
  info: Info = {info_id: 0, title: "", info: ""};
  formId: number = 0;
  
  open = false;
  update = false;
  popup = false;
  addSubmitted = false;
  updateSubmitted = false;
  delSubmitted = false;
  error = "";
  err = false;

  public Editor = ClassicEditor;

  constructor(private infoService: WebInformationService) { }

  ngOnInit(): void {
    this.getAllInfo();
  }

  async getAllInfo() {

    this.infoService.getAllInfo().subscribe(
      data => {

        this.information = data;
        
      }
    )
  }

  openForm() {
    if(this.open === false ) {
      
      this.addSubmitted = false;
      this.open = true;

    } else {

      this.open = false;
    }
  }

  selectAndOpen(info: Info) {
    
    this.updateSubmitted = false;
    this.open = false;
    
    if(this.update === false ) {
      
      this.update = true;
      this.formId = info.info_id;
      this.info.title = info.title;
      this.info.info = info.info;
      
    } else if(this.update === true && info.info_id === this.formId) {
      this.update = false;
    } else {

      this.update = true;
      this.formId = info.info_id;
      this.info.title = info.title;
      this.info.info = info.info;
    }
  }

  
  deletePopup(info: Info) {
    this.popup = true;
    this.delSubmitted = false;
    this.formId = info.info_id;
    this.info.title = info.title;
  }
  
  cancel() {
    this.popup = false;
    this.update = false;
  }
  
  addInfo(f: NgForm) {
    this.infoService.postInfo(this.newInfo).subscribe(
      (data: Info) => {

        this.information.push(data);

        this.addSubmitted = true;
        f.reset();

        this.getAllInfo();
        
        return this.information;

      },
      HttpErrorResponse => {

        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
        this.err = true;
      }
    );
  }

  updateInfo(id: number, f: NgForm) {
    this.infoService.updateInfo(id, this.info).subscribe(
      data => {

        this.updateSubmitted = true;

        f.reset();
        this.getAllInfo();

      },
      HttpErrorResponse => {

        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
        this.err = true;
      }
    );
    
  }

  deleteInfo(id: number) {
    this.infoService.deleteInfo(id).subscribe(
      data => {

        this.delSubmitted = true;
        this.getAllInfo();

      },
      HttpErrorResponse => {

        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
        this.err = true;
      }
    );
  }

}
