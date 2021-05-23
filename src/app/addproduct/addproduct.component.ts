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
  serviceUrl = GlobalConstants.apiServiceServerURL + 'api/images';
  serviceUrlImg = GlobalConstants.apiServiceServerURL + 'image/checkProduct';
  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({productImage: '', productName: '', productDescription: '', productCategory: '', productPrice: ''});
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
        category: this.myForm.getRawValue().productCategory,
        askingPrice: this.myForm.getRawValue().productPrice
      }
    };
    this.http.post(this.url, this.postData, {headers: {Authorization: this.profileJson}}).toPromise()
      .then((reponse) => {
        const getID = JSON.parse(JSON.stringify(reponse, null, 2));
       // alert('Product was added!');
       // return this.http.post(url, formData, {responseType: 'text'});
        const imgCheck = {
          clientToken: this.profileJson,
          productId: getID.id
        };
        console.log(imgCheck);
        this.http.post(this.serviceUrlImg, imgCheck, {headers: {Authorization: this.profileJson}}).toPromise()
          .then( () => {
            alert('Product was added!');
            return this.http.post(url, formData, {responseType: 'text'});
          }).catch( () => {
            alert('Error! Something happened when uploading the image');
        });
    }).catch(data => {
      alert('Error! Something happened when adding the product');
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
    this.router.navigate(['/products']);
  }
}
