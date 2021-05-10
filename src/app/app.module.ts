import { NgModule, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HttpClientModule } from '@angular/common/http';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProductComponent } from './product/product.component';
import {AgmCoreModule} from '@agm/core';
// @ts-ignore
import {} from 'googlemaps';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewProductComponent } from './view-product/view-product.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: MyprofileComponent },
  { path: 'products', component: ProductComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'products/view', component: ViewProductComponent },
  { path: '', component: HomeComponent },
]; // sets up routes constant where you define your routes

// @NgModule({
//   declarations: [
//     AppComponent,
//     HomeComponent,
//     AboutComponent,
//     LoginComponent,
//     RegisterComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     Ng2SearchPipeModule,
//     //RouterModule.forRoot([{path : 'register', component: RegisterComponent}], {enableTracing: true})
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MyprofileComponent,
    ProductComponent,
    AddproductComponent,
    ViewProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'abc'
    }),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'blue-bird.eu.auth0.com',
      clientId: 'TquPbjI56X4ztU0YYI0lmXNRfS16572g'
    }),
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  static productID: any;

}


