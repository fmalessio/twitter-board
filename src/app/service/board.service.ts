import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Board } from '../classes/board';
import { Observable } from 'rxjs';
import { Interest } from '../classes/interest';
import { Tweet } from '../classes/tweet';

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

  public getAllIntersts(board: Board): Observable<Interest[]> {
    let url = this.urlUserService + `/${board.id}/interests`;
    console.log('Getting from ' + url);

    let options = { headers: this.httpHeaders };

    return this.http.get<Interest[]>(url, options);
  }

  public getNewTweets(board: Board, lastSearched: number): Observable<Tweet[]> {
    let url = this.urlUserService + `/${board.id}/tweets?last-searched=${lastSearched}`;
    console.log('Getting from ' + url);

    let options = { headers: this.httpHeaders };

    return this.http.get<Tweet[]>(url, options);
  }

  public delete(board: Board, token: string): Observable<{}> {
    let url = this.urlUserService + `/${board.id}`;
    console.log('Sending to ' + url);

    this.httpHeaders = this.httpHeaders.append('token', token);
    let options = { headers: this.httpHeaders };

    return this.http.delete(url, options);
  }

}
