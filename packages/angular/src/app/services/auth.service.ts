import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';

export interface IUser {
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}

const defaultPath = '/';
export const defaultUser: IUser = {
  email: 'jheart@dx-email.com',
  name: 'John Heart',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
};

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/test',
  clientId: 'test',
  redirectUri: window.location.origin + '/auth/authorization_code',
  scope: 'openid profile email',
  responseType: 'code',
  tokenEndpoint: 'http://localhost:8080/realms/test/protocol/openid-connect/token',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation : false,
  skipIssuerCheck : true
};

@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;

  get loggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
    }

  private _lastAuthenticatedPath: string = defaultPath;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private oauthService: OAuthService) { 
      this.oauthService.configure(authConfig);
      this.oauthService.loadDiscoveryDocument();
  }

  async logIn(email: string, password: string) {
    // try {
    //   // Send request
    //   this._user = { ...defaultUser, email };
       this.router.navigate([this._lastAuthenticatedPath]);

    //   return {
    //     isOk: true,
    //     data: this._user,
    //   };
    // } catch {
    //   return {
    //     isOk: false,
    //     message: 'Authentication failed',
    //   };
    // }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/auth/create-account']);
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  async logOut() {
    this.router.navigate(['/auth/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'login-oauth2',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
      'authorization_code',
      'state',
    ].includes(route.routeConfig?.path || defaultPath);

    if (!isLoggedIn && !isAuthForm) {
       this.router.navigate(['/auth/login-oauth2']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
