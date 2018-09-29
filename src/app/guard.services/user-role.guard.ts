import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessTokenService } from '../services/accesstoken.service';
import { AccontService } from '../services/account.service';
import { IRoleAccount } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private acctokenService: AccessTokenService,
    private accountService: AccontService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve) => {

      const role: IRoleAccount[] = next.data.role;

      this.accountService.onGetProfile(this.acctokenService.getAccesstokenStore())
        .then(userLogin => {
          if (role.filter(it => it == userLogin.role).length > 0) {
            resolve(true);
          }
        })
        .catch(() => resolve(false));
      return false;
    });
  }

}
