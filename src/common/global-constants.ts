import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalConstants {
  // public static apiURL = 'http://3.66.189.188:8080/';
   public static apiURL = 'http://localhost:8080/';
  public productID = '';
  // tslint:disable-next-line:typedef
  getPublicID() {return this.productID; }
  // tslint:disable-next-line:typedef
  setPublicID(id: string) {this.productID = id; }
}
