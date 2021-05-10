import {Component, Inject} from '@angular/core';
import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import {GlobalConstants} from '../common/global-constants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  profileJson;
  title = 'OMTIAMT';
  searchText;
  url = GlobalConstants.apiURL + 'client';
  users = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];
  private postData: {};
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private http: HttpClient) {}
  ngOnInit(): void {
    const header = document.querySelector('nav');
    const sectionOne = document.querySelector('.wrapper');

    header.classList.add('nav-noscroll');
    header.classList.remove('.navigation');
    // tslint:disable-next-line:triple-equals
    // if (this.auth != null) {
    //   this.auth.user$.subscribe((profile) => {
    //     this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
    //     if (this.profileJson === null) {}
    //     else {
    //       this.postData = {
    //         email: this.profileJson.email,
    //         userID: this.profileJson.sub
    //       };
    //       this.http.post(this.url, this.profileJson.sub).toPromise().then(data => {
    //         console.log(data);
    //       });
    //     }
    //   });
    // }



  }
}

