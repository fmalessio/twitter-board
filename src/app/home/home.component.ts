import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor() {
  }

  ngOnInit() {
    console.log("HomeComponent Init");
    this.user = JSON.parse(localStorage.getItem(User.STORAGE_NAME));
  }

}
