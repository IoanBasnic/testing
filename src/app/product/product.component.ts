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

  ngOnInit(): void {}
  setOrder(value: string): void {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  onClickFunction(param: {}): void {
    localStorage.clear();
    if (typeof param === 'string') {
      localStorage.setItem('productID', param);
    }
  }
}
