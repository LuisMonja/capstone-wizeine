import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';
  username: string = '';
  tokenUpdated: EventEmitter<any> = new EventEmitter();
  tokenRevoked: EventEmitter<any> = new EventEmitter();
  signupped: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  signup(email: string, username: string, password: string) {
    const URL = `${environment.host}/states/signup`
    this.httpClient
      .post(URL, {email, username, password })
      .subscribe({
        next: () => {
          this.signupped.emit();
        },
        error: (err) => {
          alert(JSON.stringify(err))
        }
      });
  }

  setSession(username: string, password: string) {
    const URL = `${environment.host}/states/token`
    this.httpClient
      .post(URL, { username, password })
      .subscribe({
        next: (res: any) => {
          this.token = res.token;
          this.username = username;
          this.tokenUpdated.emit();
        },
        error: (err) => {
          alert(JSON.stringify(err))
        }
      });
  }


  unsetSession() {
    this.token = '';
    this.username = '';
    this.tokenRevoked.emit();
  }

}
