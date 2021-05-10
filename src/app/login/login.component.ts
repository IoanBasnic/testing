import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient) {
    // this.http.post(this.url, this.postData).toPromise().then(data => {console.log(data); });
  }

  myForm: FormGroup;

  postData = {
  };

  url = GlobalConstants.apiURL + 'client/login';
  profileJson;

  ngOnInit(): void {
    const header = document.querySelector('nav');
    const sectionOne = document.querySelector('.wrapper');

    header.classList.add('nav-noscroll');
    header.classList.remove('.navigation');

    this.myForm = this.fb.group({username: '', password: ''});
    this.myForm.valueChanges.subscribe(console.log);
  }
  loginClient(): void {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
     // this.http.post(this.url, this.profileJson.sub).toPromise().then(data => {console.log(data); });
    });
    // this.postData = {
    //   username: this.myForm.getRawValue().username,
    //   email: this.myForm.getRawValue().email,
    //   password: this.myForm.getRawValue().password
    // };
    // // this.http.post(this.url, 200, {observe: 'response'}).subscribe(resp => {
    //  //   console.log(resp);
    //  // });
    // this.http.post(this.url, this.postData, {observe: 'response'}).subscribe(resp => {
    //   if (resp.status === 200) {
    //     window.location.href = '/profile';
    //   }
    //   else {
    //     alert('Error: ' + resp.status);
    //   }
    //  });
  }
}
