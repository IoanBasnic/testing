import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../common/global-constants';
import {AppModule} from '../app.module';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  ProductID: any;
  url = GlobalConstants.apiURL + 'product';
  urlSendMessage = GlobalConstants.apiServiceServerURL + 'product/notif';
  urlClient;
  itemList;
  profileJson;
  product = {
    image: 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg',
    title: '<add title>',
    description: ' <add desc>',
    price: '<add price>',
  };
  seller = {
    name: '<add name>',
    email: '<add email>',
    phoneNumber: ' <add phoneNumber>',
    paymentMethod: '<add paymentMethod>',
    lat: 44.426164962,
    lng: 26.102332924,
  };
  client = {
    name: '<add name>',
    email: '<add email>',
  };
  myForm: any;
  constructor(private fb: FormBuilder, private http: HttpClient, public auth: AuthService) {
    this.myForm = this.fb.group({myMessage: ''});
  }

  ngOnInit(): void {
    this.ProductID = localStorage.getItem('productID');
    this.http.get(this.url, {responseType: 'json'}).subscribe(responseData => {
      this.itemList = responseData;
      this.createContent();
      this.urlClient = GlobalConstants.apiURL + 'product/client/?productid=' + this.ProductID;
      this.http.get(this.urlClient, {responseType: 'json'}).subscribe(responseDataClient => {
        if (responseDataClient != null) {
          this.itemList = responseDataClient;
          this.seller.name = this.itemList.givenName + ' ' + this.itemList.familyName;
          this.seller.email = this.itemList.email;
          this.seller.phoneNumber = this.itemList.phoneNumber;
          this.seller.paymentMethod = this.itemList.paymentMethod;
          this.seller.lat = this.itemList.coordinates.latitude;
          this.seller.lng = this.itemList.coordinates.longitude;
          this.auth.user$.subscribe(data => {
            this.client.name = data.given_name + ' ' + data.family_name;
            this.client.email = data.email;
            if (this.itemList.email !== data.email) {
              this.AddMsgButton();
            } else {
              this.PrintError();
            }
          });
        }
      });
    });
  }
  createContent(): void {
    this.itemList.forEach((item) => {
      if (item.id === this.ProductID) {
        this.product.title = item.title;
        this.product.description = item.description;
        this.product.price = item.askingPrice;
        if (item.image != null) { this.product.image = item.image; }
      }
    });
  }
  PrintError(): void {
    const node = document.createElement('div');
    const text = document.createElement('H2');
    text.append('You can\'t buy your own product');
    node.appendChild(text);
    // @ts-ignore
    document.getElementById('msg').appendChild(node);
  }
  AddMsgButton(): void {
    const node = document.createElement('div');
    const text = document.createElement('H2');
    const btn = document.createElement('a');

    btn.style.textDecoration = 'none';
    btn.style.border = 'none';
    btn.style.background = '#222222';
    btn.style.color = '#ffffff';
    btn.style.fontWeight = '100';
    btn.style.padding = '20px';
    btn.style.textTransform = 'uppercase';
    btn.style.borderRadius = '6px';
    btn.style.display = 'inline-block';
    btn.style.transition = 'all 0.3s ease 0s';
    text.append('Send a message to the seller');
    node.appendChild(text);
    node.appendChild(btn);
    node.style.height = '300px';
    node.style.background = '#ffffff';
    node.style.color = '#222222';
    node.style.fontSize = '24px';
    node.style.listStyleType = 'none';
    node.style.padding = '5rem 1rem';
    node.style.textAlign = 'center';
    node.style.textTransform = 'capitalize';
    node.style.fontWeight = '600';
    node.style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
    // @ts-ignore
    // tslint:disable-next-line:typedef
    btn.onclick = function onFunction() { document.getElementById('idSendMessage').style.display = 'block'; };
    btn.append('Send a message');
    document.getElementById('msg').appendChild(node);
  }

  SendMessage(): void {
    const toSend =  {
      sellerName: this.seller.name,
      toEmail: this.seller.email,
      message: {
        customerName: this.client.name,
        name: this.product.title,
        clientEmail: this.client.email,
        details: this.myForm.getRawValue().myMessage
      }
    };
    this.http.post(this.urlSendMessage, toSend).toPromise()
      .then(() => {alert('Message sent!'); })
      .catch(() => {alert('Error on sending the message!'); })
      .finally(() => {window.location.reload(); });
  }
}
