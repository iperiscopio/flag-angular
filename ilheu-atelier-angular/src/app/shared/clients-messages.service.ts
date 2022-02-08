import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { ClientInfo } from './contactClients-model';

@Injectable({
  providedIn: 'root'
})
export class ClientsMessagesService {

  baseUrl = 'http://localhost/api/';

  token = localStorage.getItem('access_token') ?? [];
  expToken = parseInt(localStorage.getItem('exp_token') ?? "");
  
  httpOptions = {
    headers: new HttpHeaders({ 'X-Auth-Token' : this.token })
  };

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getClientsMessages() {
    this.authService.checkExpToken(this.expToken);

    return this.http.get<{ [key: string]: ClientInfo }>(`${this.baseUrl}messages-manager`, this.httpOptions).pipe(
      map( (res)  => {
        const messagesArray: ClientInfo[] = [];        
        for (let key in res) {          
          if(res.hasOwnProperty(key)) {
            messagesArray.push({...res[key] })
          }
        }
        
        return messagesArray;

      })
    );
  }


  deleteClientsMessages(id: number) {
    this.authService.checkExpToken(this.expToken);
    
    return this.http.delete(`${this.baseUrl}messages-manager/${id}`, this.httpOptions);
  }
}
