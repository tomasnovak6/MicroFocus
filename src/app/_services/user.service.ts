import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {IUser} from "../_interfaces/IUser";
import {USERS_DATA} from "../_mocks/mock-users";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    // return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/users');
    return of ( USERS_DATA );
  }

}
