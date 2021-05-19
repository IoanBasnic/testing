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

    // const text = document.getElementById('text');
    // let shadow = '';
    // for (let i = 0; i < 7; i++)
    // {
    //   shadow += (shadow ? ',' : '') + -i * 1 + 'px ' + i * 1 + 'px 0 #454545';
    // }
    // text.style.textShadow = shadow;

    const header = document.querySelector('button');
    const items = document.querySelector('.itemsList_a');
    const sectionOne = document.querySelector('.wrapper');

    const sectionOneOptions = {};
    // header.classList.remove('nav-noscroll');
    // header.classList.add('.navigation');

    // if (sectionOne == null)
    // {
    //   header.classList.add('nav-noscroll');
    //   // header.classList.remove('.navigation');
    // }
    // const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver) {
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       header.classList.add('menu-btn-black');
    //     }
    //     else {
    //       header.classList.remove('menu-btn-black');
    //     }
    //   });
    // }, sectionOneOptions);
    //
    // sectionOneObserver.observe(sectionOne);

    if (this.auth != null) {
      this.auth.getAccessTokenSilently().subscribe((profile) => {
        this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
        console.log('Token ID: ' + this.profileJson);
        if (this.profileJson === null) {}
        else {
          this.http.post(this.url, this.profileJson).toPromise().then(data => {
            console.log(data);
          });
        }
      });
    }
  }

}
