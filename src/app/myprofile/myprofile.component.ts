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
  private TokenClient: string;
  constructor(public auth: AuthService, private fb: FormBuilder, private http: HttpClient) {
  }
  lat = 44.426164962;
  lng = 26.102332924;
  client = {
    phoneNumber: '<Add phone number>',
    paymentMethod: '<Add payment Method>',
    coordinates: {
      lat: this.lat,
      lng: this.lng
    }
  };
  newLat = 44.426164962;
  newLng = 26.102332924;


  url = GlobalConstants.apiURL + 'product';
  urlDelete = GlobalConstants.apiURL + 'product?productid=';
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
    this.auth.getAccessTokenSilently().subscribe(data => {
      this.TokenClient = data;
    });
    this.myForm = this.fb.group({address: '', phoneNumber: '', paymentMethod: ''});
    this.auth.user$.subscribe( (profile) => {
        this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
        this.http.get(this.url, {headers: {Authorization: this.TokenClient}}).subscribe(responseData => {
          this.itemList = responseData;
          this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
          console.log('token -- before getUserInfo: ' + this.TokenClient);
          // this.getUserInfo();
          this.createContent();
        });
        this.getUserInfo();
        // this.createContent();
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
   // this.auth.getAccessTokenSilently().subscribe(data => {
    this.formData = {
      clientToken: this.TokenClient,
      additionalInfo: {
        paymentMethod: this.myForm.getRawValue().paymentMethod,
      }
    };
    console.log('token -- before payment: ' + this.TokenClient);
    this.http.put(this.urlEditPayment, this.formData, {headers: {Authorization: this.TokenClient}}).toPromise()
      .then(() => {alert('Edited payment method!'); })
      .catch( () => {alert('Error when editing the payment method!'); })
      .finally(() => {window.location.reload(); });
   // });
  }

  editPhoneNumber(): void {
   // this.auth.getAccessTokenSilently().subscribe(data => {
      this.formData = {
        clientToken: this.TokenClient,
      additionalInfo: {
        phoneNumber: this.myForm.getRawValue().phoneNumber,
      }
    };
      console.log(this.formData);
      this.http.put(this.urlEditPhoneNumber, this.formData, {headers: {Authorization: this.TokenClient}}).toPromise()
        .then(() => {alert('Edited phone number!'); })
        .catch( () => {alert('Error when editing the phone number!'); })
        .finally(() => {window.location.reload(); });
  //  });
  }

  editAddress(): void {
  //  this.auth.getAccessTokenSilently().subscribe(data => {
      this.formData = {
        clientToken: this.TokenClient,
        additionalInfo: {
          coordinates: {lat: this.newLat, lng: this.newLng}
        }
      };
      console.log(this.formData);
      this.http.put(this.urlEditAddress, this.formData, {headers: {Authorization: this.TokenClient}}).toPromise()
        .then(() => {alert('Edited address!'); })
        .catch( () => {alert('Error when editing the address!'); })
        .finally(() => {window.location.reload(); });
    // });
  }

  private getUserInfo(): void {
  //  this.auth.getAccessTokenSilently().subscribe(data => {
      this.http.get(this.urlGetClient, {headers: {Authorization: this.TokenClient}}).subscribe(clientData => {
        const getData = JSON.parse(JSON.stringify(clientData, null, 2));
        console.log(getData);
        this.client = {
          phoneNumber: getData.phoneNumber,
          paymentMethod: getData.paymentMethod,
          coordinates: {
            lat: this.lat,
            lng: this.lng
          }
        };
        if (getData.coordinates !== null) {
          this.client = {
            phoneNumber: getData.phoneNumber,
            paymentMethod: getData.paymentMethod,
            coordinates: {
              lat: getData.coordinates.latitude,
              lng: getData.coordinates.longitude
            }
          };
          this.lat = getData.coordinates.latitude;
          this.lng = getData.coordinates.longitude;
          this.newLat = getData.coordinates.latitude;
          this.newLng = getData.coordinates.longitude;
        }
      });
   // });
  }

  onClickFunction(id: any): void {
    this.StoreID = id;
  }

  DeleteProduct(): void {
    this.http.delete(this.urlDelete + this.StoreID, {headers: {Authorization: this.TokenClient}}).toPromise()
      .then(() => {alert('Product deleted!'); })
      .catch( () => {alert('Error when deleting the product!'); })
      .finally(() => {window.location.reload(); });
  }
}
