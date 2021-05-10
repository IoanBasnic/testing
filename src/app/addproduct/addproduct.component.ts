import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../common/global-constants';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  myForm: FormGroup;
  postData = {};
  profileJson;
  url = GlobalConstants.apiURL + 'product/add';
  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    const header = document.querySelector('nav');
    const sectionOne = document.querySelector('.wrapper');

    header.classList.add('nav-noscroll');
    header.classList.remove('.navigation');
    this.myForm = this.fb.group({productImage: '', productName: '', productDescription: '', productPrice: ''});
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
    });
  }

  addProduct(): void {
    this.postData = {
      clientId: this.profileJson.sub,
      image: this.myForm.value.productImage,
      title: this.myForm.getRawValue().productName,
      description: this.myForm.getRawValue().productDescription,
      askingPrice: this.myForm.getRawValue().productPrice
    };
    console.log(this.postData);
    this.http.post(this.url, this.postData).toPromise().then(data => {console.log(data); });
  }
}
