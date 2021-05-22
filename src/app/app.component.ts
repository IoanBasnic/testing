import {Component, Inject} from '@angular/core';
import { OnInit } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import {GlobalConstants} from '../common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  profileJson;
  title = 'OMTIAMT';
  Logout = GlobalConstants.apiLogout;
  url = GlobalConstants.apiURL + 'client';
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  ngOnInit(): void {}
}

