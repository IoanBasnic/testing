import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../common/global-constants';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  myForm: FormGroup;
  postData = {};
  profileJson;
  public formData = new FormData();
  public selectedFile: File = null;
  public imageSrc: string;
  url = GlobalConstants.apiURL + 'product/add';
  serviceUrl = GlobalConstants.apiServiceServerURL;
  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    // const header = document.querySelector('nav');
    // const sectionOne = document.querySelector('.wrapper');
    //
    // header.classList.add('nav-noscroll');
    // header.classList.remove('.navigation');
    this.myForm = this.fb.group({productImage: '', productName: '', productDescription: '', productPrice: ''});
    this.auth.getAccessTokenSilently().subscribe((profile) => {
      this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
    });
  }

  public uploadImage(formData: FormData): Observable<any> {
    const file = formData.get('file') as File;
    const url = this.serviceUrl + `/upload?file=${file.name}`;
    this.postData = {
      clientToken: this.profileJson,
      product: {
        image: file,
        title: this.myForm.getRawValue().productName,
        description: this.myForm.getRawValue().productDescription,
        askingPrice: this.myForm.getRawValue().productPrice
      }
    };
    // console.log(this.postData);
    this.http.post(this.url, this.postData).toPromise().then(data => {
      console.log(data);
      return this.http.post(url, formData , {responseType: 'text'});
    }).catch(data => {
      return data;
    });
    return null;
  }

  onSelectFile(event): void {
    this.selectedFile = event.target.files[event.target.files.length - 1] as File;
  }

  performUpload(): void {
    this.formData.set('file', this.selectedFile, this.selectedFile.name);
    this.uploadImage(this.formData).subscribe(
      res => {
        this.imageSrc = res;
      }
    );
  }
  //
  // addProduct(): void {
  //   this.postData = {
  //     clientToken: this.profileJson,
  //     product: {
  //     image: this.myForm.value.productImage,
  //     title: this.myForm.getRawValue().productName,
  //     description: this.myForm.getRawValue().productDescription,
  //     askingPrice: this.myForm.getRawValue().productPrice
  //     }
  //   };
  //   console.log(this.postData);
  //   this.http.post(this.url, this.postData).toPromise().then(data => {console.log(data); });
  // }
}
