import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalConstants {
  // public static apiURL = 'http://3.66.189.188:8080/';
  // public static apiURL = 'https://omtiamt-1383005511.eu-central-1.elb.amazonaws.com:8080/';
  public static apiURL = 'https://www.covidtector.tk:8080/';
  public static apiServiceServerURL = 'https://www.covidtector.tk:6868/';
  public static apiLogout = 'https://omtiamt-heroku.herokuapp.com/';
  //  public static apiURL = 'http://localhost:8080/';
  // public static apiLogout = 'http://localhost:4200/';
  public productID = '';
  // tslint:disable-next-line:typedef
  getPublicID() {return this.productID; }
  // tslint:disable-next-line:typedef
  setPublicID(id: string) {this.productID = id; }
}
