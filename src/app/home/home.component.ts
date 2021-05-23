import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileJson;
  url = GlobalConstants.apiURL + 'client';
  private postData: {};
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private http: HttpClient, private router: Router) { }

  // this.http.post(this.url, this.postData, {headers: {Authorization: this.profileJson}}).toPromise()
  ngOnInit(): void {
    if (this.auth != null) {
      this.auth.getAccessTokenSilently().subscribe((profile) => {
        this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
        if (this.profileJson === null) {}
        else {
          this.http.post(this.url, 'smth' , {headers: {Authorization: this.profileJson}}).toPromise()
            .then(data => {console.log(data); })
            .catch(data => {console.log(data); });
        }
      });
    }
  }

  toRegisterPage(): void {
    this.router.navigate(['/register']);
  }

  toProfilePage(): void {
    this.router.navigate(['/profile']);
  }
}
