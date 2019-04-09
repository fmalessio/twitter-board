import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Board } from '../classes/board';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  selectedBoard: Board;

  constructor() {
  }

  ngOnInit() {
    console.log("HomeComponent Init");
    this.user = JSON.parse(localStorage.getItem(User.STORAGE_NAME));
  }

  public setBoardSelect(board: Board) {
    this.selectedBoard = board;
  }

}
