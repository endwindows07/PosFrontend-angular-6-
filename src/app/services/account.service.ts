import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { ILogin } from "../interfaces/login.interface";
import { IAccount } from "../interfaces/account.interface";
import { AccessTokenService } from "./accesstoken.service";

@Injectable()

export class AccontService {
    constructor 
    (
        private http: HttpService,
        private accessToekenService: AccessTokenService
    ) { }

    onLogin (model: ILogin){
        return this.http
                    .requestPost("api/account/login", model)
                    .toPromise() as Promise<{ accessToken: string }>;
    }
    
    onGetProfile (){

    }

    onUpdateProfile(){

    }
    
    onChangePassword(){

    }

    onGetAllMember (){

    }

    onRegister (){

    }

    onUpdateMember (){

    }
}