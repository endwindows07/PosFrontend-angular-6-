import { IRoleAccount } from './role';

export interface IProfile {
username: string;
fristname: string;
lastname: string;
role: IRoleAccount;
image_Url?:	string;
image?:	string;
status?:	boolean;
}
