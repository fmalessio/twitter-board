import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Board } from '../classes/board';
import { User } from '../classes/user';
import { BoardService } from '../service/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-boards-menu',
  templateUrl: './boards-menu.component.html',
  styleUrls: ['./boards-menu.component.css']
})
export class BoardsMenuComponent implements OnInit {

  boards: Board[];

  constructor(private modalService: NgbModal, private boardService: BoardService, private userService: UserService) {
  }

  ngOnInit() {
    this.searAllBoards();
  }

  private searAllBoards() {
    let user: User = JSON.parse(localStorage.getItem(User.STORAGE_NAME));
    this.userService.getAllBoards(user).subscribe(
      (data: User) => {
        console.log("Backend OK.");
        console.log(data);
        this.boards = data.boards;
      },
      (httpError: HttpErrorResponse) => {
        console.log(`Backend returned code ${httpError.status}`);
      }
    );
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(`Closed with value: ${result}`);
      // Call service
      this.createBoard(result);

    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private createBoard(boardName: string) {
    let user: User = JSON.parse(localStorage.getItem(User.STORAGE_NAME));
    let board: Board = new Board(boardName, user.id);

    this.boardService.create(board, user.token).subscribe(
      (data: Board) => {
        console.log("Backend OK.");
        console.log(data);
        this.boards.push(data);
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

  public openBoard(board: Board) {
    console.log("Opening board: " + JSON.stringify(board));
  }

  public removeBoard(board: Board) {
    console.log(board);
  }

}
