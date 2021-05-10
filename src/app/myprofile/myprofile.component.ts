import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {AgmCoreModule} from '@agm/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
@Component({
  selector: 'app-user-profile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  client = {
    name: '<add name>',
    email: ' <add email>',
    address: '<add address>',
    phoneNumber: '<add phone number>'
  };
  lat = 44.426164962;
  lng = 26.102332924;

  url = GlobalConstants.apiURL + 'product';
  urlDelete = GlobalConstants.apiURL + 'product/delete';
  itemList;
  private profileJson: any;
  constructor(public auth: AuthService, private http: HttpClient) { }

  // @ts-ignore
  ngOnInit(): void {
    const header = document.querySelector('nav');
    const sectionOne = document.querySelector('.wrapper');

    header.classList.add('nav-noscroll');
    header.classList.remove('.navigation');

    this.http.get(this.url, {responseType: 'json'}).subscribe(responseData => {
      this.itemList = responseData;

      this.auth.user$.subscribe((profile) => {
        this.profileJson = JSON.parse(JSON.stringify(profile, null, 2));
        this.createContent(this.http, this.urlDelete);
      });
    });
  }

  selectLocation($event): void {
    console.log(event);
  }


  createContent(http, urlDelete): void {
    this.itemList.forEach((item) => {
      if (item.clientId === this.profileJson.sub)
      {
        const node = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('H3');
        const desc = document.createElement('p');
        const price = document.createElement('p');
        const moreInfoBtn = document.createElement('a');
        const textPrice = document.createTextNode('Price: ' + item.askingPrice + ' lei');
        const textTitle = document.createTextNode('Title: ' + item.title);
        const textDesc = document.createTextNode('Description: ' + item.description);
        moreInfoBtn.append('Delete this product');
        // tslint:disable-next-line:typedef
        moreInfoBtn.onclick = function onClickFunction() {
          console.log(item);
          http.post(urlDelete, item.id).subscribe(responseData => {
            console.log(responseData);
          });
        };
        node.id = item.id;
        node.className = 'grid' + ' ';
        // @ts-ignore
        title.appendChild(textTitle);
        // @ts-ignore
        desc.appendChild(textDesc);
        price.appendChild(textPrice);
        img.src = item.image;
        node.appendChild(img);
        node.appendChild(title);
        node.appendChild(desc);
        node.appendChild(price);

        moreInfoBtn.style.textDecoration = 'none';
        moreInfoBtn.style.border = 'none';
        moreInfoBtn.style.background = '#222222';
        moreInfoBtn.style.color = '#ffffff';
        moreInfoBtn.style.fontWeight = '100';
        moreInfoBtn.style.padding = '20px';
        moreInfoBtn.style.textTransform = 'uppercase';
        moreInfoBtn.style.borderRadius = '6px';
        moreInfoBtn.style.display = 'inline-block';
        moreInfoBtn.style.transition = 'all 0.3s ease 0s';

        node.appendChild(moreInfoBtn);
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


        document.getElementById('dynamicContent').appendChild(node);
      }
    });
  }
}
