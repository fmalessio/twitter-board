import { Component } from '@angular/core';
import { User } from './classes/user';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  userNameStorage: string = "twiiter-board-user";

  public checkSignedIn() {
    if (window.localStorage) {
      return localStorage.getItem(this.userNameStorage) !== null;
    }
    throw new Error('LocalStorage is not supported!');
  }

  public setLoggedIn(user: User) {
    console.log("Changing singedIn status...");
    console.log(user);
    if (user !== null) {
      if (window.localStorage) {
        localStorage.setItem(this.userNameStorage, JSON.stringify(user));
      } else {
        throw new Error('LocalStorage is not supported!');
      }

    } else {
      localStorage.removeItem(this.userNameStorage);
    }

    window.location.reload();
  }

}
