import { Component, OnInit } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileJson;
  url = GlobalConstants.apiURL + 'client';
  private postData: {};
  constructor( public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    const header = document.querySelector('nav');
    const items = document.querySelector('.itemsList_a');
    const sectionOne = document.querySelector('.wrapper');

    const sectionOneOptions = {};
    header.classList.remove('nav-noscroll');
    header.classList.add('.navigation');

    if (sectionOne == null)
    {
      header.classList.add('nav-noscroll');
      header.classList.remove('.navigation');
    }
    const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          header.classList.add('nav-scroll');
        }
        else {
          header.classList.remove('nav-scroll');
        }
      });
    }, sectionOneOptions);

    sectionOneObserver.observe(sectionOne);

    if (this.auth != null) {
      this.auth.user$.subscribe((profile) => {
        this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
        if (this.profileJson === null) {}
        else {
          this.postData = {
            email: this.profileJson.email,
            userID: this.profileJson.sub
          };
          this.http.post(this.url, this.profileJson.sub).toPromise().then(data => {
            console.log(data);
          });
        }
      });
    }
  }

}
