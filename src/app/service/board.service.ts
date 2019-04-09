import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Board } from '../classes/board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private urlUserService: string;
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.urlUserService = environment.service_api_url + "/boards";
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public create(board: Board, token: string): Observable<Board> {
    console.log('Sending to ' + this.urlUserService);
    console.log(board);

    this.httpHeaders = this.httpHeaders.append('token', token);
    let options = { headers: this.httpHeaders };

    return this.http.post<Board>(this.urlUserService, board, options);
  }

}
