import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Board } from '../classes/board';
import { Interest } from '../classes/interest';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InterestService } from '../service/interest.service';
import { User } from '../classes/user';
import { HttpErrorResponse } from '@angular/common/http';
import { BoardService } from '../service/board.service';
import { timer, Subscription } from 'rxjs';
import { Tweet } from '../classes/tweet';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {

  private _board: Board;
  interests: Interest[] = [];

  // tweets
  private searchTweetsSubscription: Subscription;
  private lastSearched: number = 0;
  tweets: Tweet[] = [];
  page = 1;
  pageSize = 10;

  constructor(private modalService: NgbModal, private interestService: InterestService, private boardService: BoardService) {
  }

  ngOnInit() {
  }

  @Input()
  set board(board: Board) {
    // reset
    this.interests = [];
    this.tweets = [];
    this.stopTweetsSubscription();
    this.lastSearched = 0;
    this.page = 1;
    // create
    this._board = board;
    this.searchInterestsAndTweets(board);
  }

  get board(): Board {
    return this._board;
  }

  private searchInterestsAndTweets(board: Board) {
    // Get all interests
    this.boardService.getAllIntersts(board).subscribe(
      (data: Interest[]) => {
        console.log("Backend OK.");
        console.log(data);
        this.interests = data;

        if (data.length > 0) {
          this.startTweetsSubscription();
        }
      },
      (httpError: HttpErrorResponse) => {
        console.log(`Backend returned code ${httpError.status}`);
      }
    );
  }

  private startTweetsSubscription() {
    this.searchTweetsSubscription = timer(500, 35000).subscribe(x => {
      console.log("Searching new tweets...");

      this.boardService.getNewTweets(this.board, this.lastSearched).subscribe(
        (data: Tweet[]) => {
          console.log("Backend OK.");
          if (data.length > 0) {
            console.log(data.length);
            this.lastSearched = data[0].id;
            this.tweets = data.concat(this.tweets);
          }
        },
        (httpError: HttpErrorResponse) => {
          console.log(`Backend returned code ${httpError.status}`);
        }
      );
    });
  }

  private stopTweetsSubscription() {
    if (this.searchTweetsSubscription) {
      this.searchTweetsSubscription.unsubscribe();
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(`Closed with value: ${result}`);
      // Call service
      this.createInterest(result);

    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private createInterest(value: string) {
    let user: User = JSON.parse(localStorage.getItem(User.STORAGE_NAME));
    let interest = new Interest(value, this._board.id);

    this.interestService.create(interest, user.token).subscribe(
      (data: Interest) => {
        console.log("Backend OK.");
        console.log(data);
        if (this.interests.length == 0) {
          this.startTweetsSubscription();
        }
        this.interests.push(data);
      },
      (httpError: HttpErrorResponse) => {
        console.log(`Backend returned code ${httpError.status}`);
      }
    );

  }

  public removeInterest(interest: Interest) {
    let user: User = JSON.parse(localStorage.getItem(User.STORAGE_NAME));

    this.interestService.delete(interest, user.token).subscribe(
      () => {
        console.log("Backend OK.");
        this.interests = this.interests.filter(item => item.id !== interest.id);
      },
      (httpError: HttpErrorResponse) => {
        console.log(`Backend returned code ${httpError.status}`);
      }
    );

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Updating ngfor to refresh the html componet
  public identifyFor(index: number, item: any): any {
    return item;
  }

  get getTweetsPaginated(): Tweet[] {
    return this.tweets.map((tweet, i) => ({ id: i + 1, ...tweet }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public tableCompleteSize(): number {
    if (this.tweets.length > 100) {
      return 100;
    }
    return this.tweets.length;
  }

}
