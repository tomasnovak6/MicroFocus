import {IUserCompany} from "./IUserCompany";

export interface IUser {
  id: number | string;
  name?: string;
  username?: string;
  email?: string;
  address?: any;
  phone?: string;
  website?: string;
  company: IUserCompany;
}
