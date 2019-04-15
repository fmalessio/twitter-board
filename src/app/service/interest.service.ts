import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Interest } from '../classes/interest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  private urlUserService: string;
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.urlUserService = environment.service_api_url + "/interests";
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public create(interest: Interest, token: string): Observable<Interest> {
    console.log('Sending to ' + this.urlUserService);
    console.log(interest);

    this.httpHeaders = this.httpHeaders.append('token', token);
    let options = { headers: this.httpHeaders };

    return this.http.post<Interest>(this.urlUserService, interest, options);
  }

  public delete(interest: Interest, token: string): Observable<{}> {
    let url = this.urlUserService + `/${interest.id}`;
    console.log('Sending to ' + url);

    this.httpHeaders = this.httpHeaders.append('token', token);
    let options = { headers: this.httpHeaders };

    return this.http.delete(url, options);
  }

}
