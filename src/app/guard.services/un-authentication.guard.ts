import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessTokenService } from '../services/accesstoken.service';
import { AppUrl } from '../app.url';

@Injectable({
  providedIn: 'root'
})
export class UnAuthenticationGuard implements CanActivate {

  constructor(
    private accesstokenService: AccessTokenService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.accesstokenService.getAccesstokenStore()) {
      this.router.navigate(['/', AppUrl.Account]);
      return false;
    }

    return true;
  }
}
