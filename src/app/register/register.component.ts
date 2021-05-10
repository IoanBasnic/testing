import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {User} from '../user.model';
import {GlobalConstants} from '../../common/global-constants';
import {AuthService} from '@auth0/auth0-angular';






@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user: User = new User();
  register: any;
  myForm: FormGroup;
  profileJson;
  postData = {
  };
  url = GlobalConstants.apiURL + 'client';

  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient) {
    // this.http.post(this.url, this.postData).toPromise().then(data => {console.log(data); });
  }


  ngOnInit(): void {
    const header = document.querySelector('nav');
    const sectionOne = document.querySelector('.wrapper');

    header.classList.add('nav-noscroll');
    header.classList.remove('.navigation');
    this.myForm = this.fb.group({username: '', email: '', password: ''});
    this.myForm.valueChanges.subscribe(console.log);
  }

  createUser(): void {
    console.log(this.auth);
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
      console.log(this.profileJson);
      //this.http.post(this.url, this.profileJson.sub).toPromise().then(data => {console.log(data); });
    });
    window.location.replace('localhost:4200');
    // this.postData = {
    //   username: this.myForm.getRawValue().username,
    //   email: this.myForm.getRawValue().email,
    //   password: this.myForm.getRawValue().password
    // };
    // // this.http.post(this.url, this.postData).toPromise().then(data => {console.log(data); });
    // this.http.post(this.url, this.postData, {observe: 'response'}).subscribe(resp => {
    //   console.log(resp.status);
    //   if (resp.status === 200) {
    //     alert('Congratulations, your account has been successfully created!');
    //     window.location.href = '/login';
    //   }
    //   else {
    //     alert('Error: ' + resp.status);
    //   }
    // });
  }
}



