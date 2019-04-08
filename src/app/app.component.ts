import { Component, OnInit, NgZone } from '@angular/core';
import { User } from './classes/user';
import { Router } from '@angular/router'
import { UserService } from './service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private router: Router, private ngZone: NgZone, private userService: UserService) {
  }

  ngOnInit() {
    this.nevigateBySession();
  }

  private nevigateBySession() {
    if (this.checkSignedIn()) {
      this.ngZone.run(() =>
        this.router.navigate(['/home']))
    } else {
      this.router.navigate(['/signedout']);
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
        // Call login in the backend
        this.userService.login(user).subscribe(
          (data) => {
            console.log("Backend login OK.");
            console.log(data);
            localStorage.setItem(User.STORAGE_NAME, JSON.stringify(user));
            this.nevigateBySession();
          },
          (httpError: HttpErrorResponse) => {
            console.log(`Backend returned code ${httpError.status}`);
            localStorage.removeItem(User.STORAGE_NAME);
            this.nevigateBySession();
          }
        );
      } else {
        throw new Error('LocalStorage is not supported!');
      }

    } else {
      localStorage.removeItem(User.STORAGE_NAME);
      this.nevigateBySession();
    }
  }

}
