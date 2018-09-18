import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ILogin } from '../interfaces/login.interface';
import { AccessTokenService } from './accesstoken.service';
import { IProfile } from '../interfaces/profile.interface';
import { IMember } from '../interfaces/member.interface';
import { IChangePassword } from '../interfaces/change-password.interface';
declare let $;

@Injectable()
export class AccontService {
  constructor(
    private http: HttpService,
  ) {}

  onLogin(model: ILogin) {
    return this.http
      .requestPost(`api/account/login`, model)
      .toPromise() as Promise<{ accessToken: string }>;
  }

  onGetProfile(accessToken: string) {
    return this.http
      .requestGet(`api/member/data`, accessToken)
      .toPromise() as Promise<IProfile>;
  }

  onUpdateMember(accessToken: string) {
    return this.http
      .requestPost(`api/member/profile`, accessToken)
      .toPromise() as Promise<IProfile>;
  }

    onGetMemberByID(id: any, accessToken: string) {
        return this.http
        .requestGet(`api/member/get-member/${id}`, accessToken)
        .toPromise() as Promise<IProfile>;
  }

  onChangePassword(model: IChangePassword, accesstoken: string) {
    return this.http
      .requestPost(`api/member/chang-password`, model, accesstoken)
      .toPromise() as Promise<IChangePassword>;
  }

  onGetAllMember(accessToken: string) {
    return this.http
      .requestGet(`api/member/all-member`, accessToken)
      .toPromise() as Promise<IMember>;
  }

  onRegister(model: IProfile, id: any, accessToken: string) {
    return this.http
      .requestPost(`api/Member/update-member/${id}`, model, accessToken)
      .toPromise() as Promise<IProfile>;
  }

  onUpdateProfile(model: IProfile, accessToken: string) {
    return this.http
      .requestPost(`api/member/profile`, model, accessToken)
      .toPromise() as Promise<IProfile>;
  }
}
