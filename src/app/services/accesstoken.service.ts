import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {
  private accessKey = 'AccessToken';

  setAccesstokenStore(accesstoken: string): void {
    localStorage.setItem(this.accessKey, accesstoken);
  }

  getAccesstokenStore(): string {
    return localStorage.getItem(this.accessKey);
  }

  clearAccesstokenStore(): void {
    localStorage.removeItem(this.accessKey);
  }
}
