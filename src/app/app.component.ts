import { Component, OnInit } from '@angular/core';
import { User } from './classes/user';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.nevigateBySession();
  }

  private nevigateBySession() {
    if (this.checkSignedIn()) {
      this.router.navigateByUrl("/home");
    } else {
      this.router.navigateByUrl("/signedout");
    }
  }

  public checkSignedIn() {
    if (window.localStorage) {
      return localStorage.getItem(User.STORAGE_NAME) !== null;
    }
    throw new Error('LocalStorage is not supported!');
  }

  public setLoggedIn(user: User) {
    console.log("Changing singedIn status...");
    console.log(user);
    if (user !== null) {
      if (window.localStorage) {
        localStorage.setItem(User.STORAGE_NAME, JSON.stringify(user));
      } else {
        throw new Error('LocalStorage is not supported!');
      }

    } else {
      localStorage.removeItem(User.STORAGE_NAME);
    }

    this.nevigateBySession();
  }

}
