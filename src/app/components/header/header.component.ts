import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/classes/user';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = 'Twitter Board';

  // Login event emitter
  @Output() loginChange: EventEmitter<User> = new EventEmitter<User>();

  // Google Api
  @ViewChild('googleBtn') googleBtn: ElementRef;
  private clientId: string = '425080559212-0futf7p75r8kcl8lv0n72iiiqo6ktt2f.apps.googleusercontent.com';
  private scope = [
    'profile',
    'email'
  ].join(' ');
  public auth2: any;

  constructor() { }

  ngOnInit() {
  }

  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      // that.element.nativeElement.firstChild
      that.attachSignin(that.googleBtn.nativeElement);
    });
  }

  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();

        let token = googleUser.getAuthResponse().id_token;
        let user = new User(profile, token);
        console.log('User: ' + user);
        console.log('Token: ' + token);

        that.loginChange.emit(user);

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
        that.loginChange.emit(null);
      });
  }

  public signOut() {
    let that = this;
    this.auth2.signOut().then(function () {
      console.log('User signed out.');
      that.loginChange.emit(null);
    });
    // To check is signed
    // this.auth2.isSignedIn.get();
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
