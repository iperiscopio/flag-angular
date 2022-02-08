import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsMessagesService } from 'src/app/shared/clients-messages.service';
import { ClientInfo } from 'src/app/shared/contactClients-model';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailService } from 'src/app/shared/Email/email.service';
import { Email } from 'src/app/shared/Email/email';

@Component({
  selector: 'app-clients-messages',
  templateUrl: './clients-messages.component.html',
  styleUrls: ['./clients-messages.component.scss']
})
export class ClientsMessagesComponent implements OnInit {

  messages: ClientInfo[] = [];
  emails: Email[] = [];

  email: Email = { 
      message_id: 0, 
      title: "", 
      name: "",
      email: "", 
      subject: "", 
      message: "",
      attachments: []
  }

  error = '';
  emailSubmitted = false;
  delSubmitted = false;
  emailPopup = false;
  delPopup = false;
  messageId: number = 0;
  messageTitle: string = "";
  messageName: string = "";
  messageEmail: string = "";
  attachmentsValue?: any;

  public Editor = ClassicEditor;

  constructor(private messagesService: ClientsMessagesService,
              private emailService: EmailService) { }


  ngOnInit(): void {
    this.getMessages();
    
  }

  // FUNCTION TO GET ALL MESSAGES FROM DB
  getMessages() {
    this.messagesService.getClientsMessages().subscribe( 
      data => {
        this.messages = data;
        
      }, 
      (HttpErrorResponse: any) => {
          
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
      }
    )
  }

  // FUNCTION TO OPEN POPUP TO SEND EMAIL
  sendEmailPopup(message: ClientInfo) {
    this.emailPopup = true;
    this.emailSubmitted = false;

    this.email.message_id = message.message_id!;
    this.email.title = message.title;
    this.email.name = message.name;
    this.email.email = message.email;
  }

  // SEND EMAIL POPUP FUNCTION TO SELECT FILES
  onSelectedFile(event: any) {
    for(let i = 0; i < event.target.files.length; i++) {
      
      let results = this;
      let file = event.target.files[i];

      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = function () {

        results.attachmentsValue = reader.result;

        // start str replace  eg: data:image/svg+xml;base64,
        let index = results.attachmentsValue.indexOf(",");
        let slice = results.attachmentsValue.slice(0, index+1);
        let attachments = results.attachmentsValue.replace(slice, "");
        // end str replace
        
        results.email.attachments.push(attachments);
        
      };
        reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      
    };
    
    return this.email.attachments;
  }


  // POPUP FUNCTION TO SEND EMAIL TO CLIENT
  sendEmail(f: NgForm) {
    this.emailService.sendEmail(this.email).subscribe(
      (data: Email) => {
        
        this.emails.push(data);
        
        this.emailSubmitted = true;
        f.reset();
        
        return this.emails;
      }, 
      (HttpErrorResponse: any) => {
          
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
      }
    )
    
  }
  
  // FUNCTION TO OPEN POPUP TO DELETE MESSAGE FROM DB
  deletePopup(message: ClientInfo) {
    
    this.delPopup = true;
    this.delSubmitted = false;
    this.messageId = message.message_id!;
    this.messageTitle = message.title;
    this.messageName = message.name!;
  }
  

  // FUNCTION TO HIDE POPUPS
  cancel() {
    this.delPopup = false;
    this.emailPopup = false;
  }


  // FUNCTION TO DELETE MESSAGE
  deleteMessage(id: number) {
    
    this.messagesService.deleteClientsMessages(id).subscribe( 
      data => {

        this.delSubmitted = true;
        this.getMessages();
        
      }, 
      (HttpErrorResponse: any) => {
          
        if( HttpErrorResponse.status >= 422 ) {

          this.error = HttpErrorResponse.error.message;
          
        } else {

          this.error = HttpErrorResponse.error.message;

        }
        
      }
    );
  }

}
