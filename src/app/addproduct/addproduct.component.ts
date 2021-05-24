import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../common/global-constants';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

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
  serviceUrl = GlobalConstants.apiServiceServerURL + 'image';
  serviceUrlImg = GlobalConstants.apiServiceServerURL + 'image/checkProduct';
  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({productImage: '', productName: '', productDescription: '', productCategory: '', productPrice: ''});
    this.auth.getAccessTokenSilently().subscribe((profile) => {
      this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
    });
  }

  public uploadImage(formData: FormData): void {
    const file = formData.get('file') as File;
    const url = this.serviceUrl + `/uploadFile?file=${file.name}`;
    this.postData = {
      clientToken: this.profileJson,
      product: {
        image: file,
        title: this.myForm.getRawValue().productName,
        description: this.myForm.getRawValue().productDescription,
        category: this.myForm.getRawValue().productCategory,
        askingPrice: this.myForm.getRawValue().productPrice
      }
    };
    this.http.post(this.url, this.postData, {headers: {Authorization: this.profileJson}}).toPromise()
      .then((reponse) => {
        const getID = JSON.parse(JSON.stringify(reponse, null, 2));
        const imgCheck = {
          clientToken: this.profileJson,
          productId: getID.id
        };
        this.http.post(this.serviceUrlImg, imgCheck, {headers: {Authorization: this.profileJson}}).toPromise()
          .then( () => {
            alert('Product was added!');
            const imageForm = new FormData();
            imageForm.append('file', this.selectedFile);
            this.http.post(url, imageForm).toPromise().then(a => {alert('Product was added!'); console.log(a); })
              .catch(a => { alert('Error! Something happened when uploading the image'); console.log(a); });
          }).catch( () => {
            alert('Error! Something happened when sending some information');
        });
    }).catch(data => {
      alert('Error! Something happened when adding the product');
    });
  }


  onSelectFile(event): void {
     this.selectedFile = event.target.files[event.target.files.length - 1] as File;
     console.log(this.selectedFile);
  }

  performUpload(): void {
    this.formData = new FormData();
    this.formData.set('file', this.selectedFile, this.selectedFile.name);
    this.uploadImage(this.formData);
  }
}


