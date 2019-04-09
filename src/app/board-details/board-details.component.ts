import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../classes/board';
import { Interest } from '../classes/interest';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InterestService } from '../service/interest.service';
import { User } from '../classes/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {

  private _board: Board;
  interests: Interest[] = [];

  constructor(private modalService: NgbModal, private interestService: InterestService) { }

  ngOnInit() {
  }

  @Input()
  set board(board: Board) {
    this._board = board;
    console.log("TODO: call service to show all interest");
  }

  get board(): Board {
    return this._board;
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
        this.interests.push(data);
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

}
