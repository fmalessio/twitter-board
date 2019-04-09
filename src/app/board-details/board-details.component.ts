import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../classes/board';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {

  private _board: Board;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set board(board: Board) {
    this._board = board;
    console.log("TODO: call service");
  }

  get board(): Board {
    return this._board;
  }

}
