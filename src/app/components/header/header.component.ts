import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // TODO: save session on localstorage

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  public signOut() {
    this.auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    // To check is signed
    // this.auth2.isSignedIn.get();
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
