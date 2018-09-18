import { IRoleAccount } from './role';
import { Data } from '@angular/router';

export interface IProfile {
    username?: string;
    fristname: string;
    lastname: string;
    role?: IRoleAccount;
    image_Url?:	string;
    image?:	string;
    updated?: Data;
    status?:	boolean;
}
