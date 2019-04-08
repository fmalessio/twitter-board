import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUserService: string;
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.urlUserService = environment.service_api_url + "/users";
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public login(user: User): Observable<User> {
    console.log('Sending to' + this.urlUserService);
    console.log(user);

    this.httpHeaders = this.httpHeaders.append('token', user.token);
    let options = { headers: this.httpHeaders };

    return this.http.put<User>(this.urlUserService, user, options);
  }

}
