import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router} from '@angular/router';

@Component({
  selector: 'PageNotFoundComponent',
  template: ''
})
export class RedirectComponent implements OnInit {
  constructor(private oauthService: OAuthService,
    private router: Router) {}

  ngOnInit() {
    this.oauthService.tryLoginCodeFlow();
    this.router.navigate(['/']);
  }
}