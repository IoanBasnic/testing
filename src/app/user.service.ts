import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// @ts-ignore
import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  // private userUrl = 'http://localhost:8080/user-portal/user';
  private userUrl = 'http://localhost:8080/client';

  // tslint:disable-next-line:typedef
  public createUser(user) {
    console.log(user);
    return this.http.post<User>(this.userUrl, user);
  }

}
