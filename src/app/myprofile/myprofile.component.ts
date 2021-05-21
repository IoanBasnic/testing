import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {AgmCoreModule} from '@agm/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {FormBuilder} from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
@Component({
  selector: 'app-user-profile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  private StoreID: any;
  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient) {
  }
  client;
  lat = 44.426164962;
  lng = 26.102332924;
  newLat = 44.426164962;
  newLng = 26.102332924;


  url = GlobalConstants.apiURL + 'product';
  urlDelete = GlobalConstants.apiURL + 'product';
  urlGetClient = GlobalConstants.apiURL + 'client';
  urlEditAddress = GlobalConstants.apiURL + 'client';
  urlEditPhoneNumber = GlobalConstants.apiURL + 'client';
  urlEditPayment = GlobalConstants.apiURL + 'client';
  itemList; formData = {};
  private profileJson: any;

  // @ts-ignore
  myForm: any;
  // tslint:disable-next-line:no-shadowed-variable
  MyList = [];
  ngOnInit(): void {
    // const header = document.querySelector('button');
    // header.classList.add('menu-btn-black');
    this.myForm = this.fb.group({address: '', phoneNumber: '', paymentMethod: ''});
    this.http.get(this.url, {responseType: 'json'}).subscribe(responseData => {
      this.itemList = responseData;
      this.auth.user$.subscribe(async (profile) => {
          this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
          this.getUserInfo();
          this.createContent();
      });
    });
  }
  selectLocation(event): void {
    this.newLat = event.coords.lat;
    this.newLng = event.coords.lng;
  }


  createContent(): void {
    this.itemList.forEach((item) => {
      if (item.clientId === this.profileJson.sub && this.MyList.some(e => e.id === item.id) === false)
      {
        this.MyList.push(item);
      }
    });
  }

  editPayment(): void {
    this.auth.getAccessTokenSilently().subscribe(data => {
    this.formData = {
      clientToken: data,
      additionalInfo: {
        paymentMethod: this.myForm.getRawValue().paymentMethod,
      }
    };
    this.http.put(this.urlEditPayment, this.formData).toPromise().then(datas => {console.log(datas); });
    window.location.reload();
    });
  }

  editPhoneNumber(): void {
    this.auth.getAccessTokenSilently().subscribe(data => {
      this.formData = {
        clientToken: data,
      additionalInfo: {
        phone_number: this.myForm.getRawValue().phoneNumber,
      }
    };
      this.http.put(this.urlEditPhoneNumber, this.formData).toPromise().then(datas => {console.log(datas); window.location.reload(); });
      window.location.reload();
    });
  }

  editAddress(): void {
    this.auth.getAccessTokenSilently().subscribe(data => {
      this.formData = {
        clientToken: data,
        additionalInfo: {
          coordinates: {lat: this.newLat, lng: this.newLng}
        }
      };
      this.http.put(this.urlEditAddress, this.formData).toPromise().then(datas => {console.log(datas);  window.location.reload(); });
      window.location.reload();
    });
  }

  private getUserInfo(): void {
    this.auth.getAccessTokenSilently().subscribe(data => {
      this.http.get(this.urlGetClient + '/' + data, {responseType: 'json'}).subscribe(clientData => {
        this.client = clientData;
        if (this.client.coodinates !== null) {
          this.lat = this.client.coodinates.lat;
          this.lng = this.client.coodinates.lng;
        }
      });
    });
  }

  onClickFunction(id: any): void {
    this.StoreID = id;
  }

  DeleteProduct(): void {
    this.http.delete(this.urlDelete, this.StoreID).toPromise().then(datas => {console.log(datas);   });
    window.location.reload();
  }
}
