import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'PageNotFoundComponent',
  template: ''
})
export class LoginOauth2Component implements OnInit{
  constructor(private oauthService: OAuthService) {}

  ngOnInit(): void {
    this.login();
  }
  login() {
    this.oauthService.initCodeFlow();
  }
}