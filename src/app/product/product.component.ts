import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../common/global-constants';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AppModule} from '../app.module';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class ProductComponent implements OnInit {
  private product: GlobalConstants;
  constructor(private fb: FormBuilder, private http: HttpClient, private products: GlobalConstants) {
    this.http.get(this.url, {responseType: 'json'}).subscribe(responseData => {
      this.itemList = responseData;
      console.log(this.itemList);
      this.product = this.products;
      this.createContent();
    });
  }

  url = GlobalConstants.apiURL + 'product';
  itemList;

  users = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];

  // @ts-ignore
  searchText: string;

  ngOnInit(): void {
    const header = document.querySelector('nav');
    const sectionOne = document.querySelector('.wrapper');

    header.classList.add('nav-noscroll');
    header.classList.remove('.navigation');

  }
  createContent(): void {
    this.itemList.forEach((item) => {
      console.log(item.price);
      const node = document.createElement('div');
      const img = document.createElement('img');
      const title = document.createElement('H3');
      const desc = document.createElement('p');
      const price = document.createElement('p');
      const moreInfoBtn = document.createElement('a');
      const textPrice = document.createTextNode('Price: ' + item.askingPrice + ' lei');
      const textTitle = document.createTextNode('Title: ' + item.title);
      const textDesc = document.createTextNode('Description: ' + item.description);
      moreInfoBtn.append('For more info, click here!');
      moreInfoBtn.href = '/products/view/';
      // tslint:disable-next-line:typedef
      moreInfoBtn.onclick = function onClickFunction() {
        console.log(item);
        localStorage.clear();
        localStorage.setItem('productID', item.id);
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
    });
  }
}
