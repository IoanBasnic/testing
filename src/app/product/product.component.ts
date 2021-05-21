import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../../common/global-constants';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AppModule} from '../app.module';
import { Injectable } from '@angular/core';
import {OrderModule, OrderPipe} from 'ngx-order-pipe';
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
  constructor(private fb: FormBuilder, private http: HttpClient, private products: GlobalConstants, private orderPipe: OrderPipe) {
    this.http.get(this.url, {responseType: 'json'}).subscribe(responseData => {
      this.itemList = responseData;
      this.sortedCollection = orderPipe.transform(this.itemList, 'user.title');
      this.product = this.products;
      this.createContent();
    });
  }

  url = GlobalConstants.apiURL + 'product';
  itemList;
  order = 'user.title';
  reverse = false;
  users = [];
  sortedCollection: any[];
  // @ts-ignore
  searchText: string;

  ngOnInit(): void {
    // const header = document.querySelector('button');
    // header.classList.add('menu-btn-black');

  }
  setOrder(value: string): void {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  createContent(): void {
    this.itemList.forEach((item) => {
      this.users.push(item.title);
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



      // document.getElementById('dynamicContent').appendChild(node);
    });
  }

  onClickFunction(param: {}): void {
    localStorage.clear();
    if (typeof param === 'string') {
      localStorage.setItem('productID', param);
    }
  }
}
