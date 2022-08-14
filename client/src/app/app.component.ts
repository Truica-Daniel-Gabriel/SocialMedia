import { Component, OnInit } from '@angular/core';
import { AccountSerivce } from './@core/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly account:AccountSerivce){}

  ngOnInit(): void {
    this.account.isLoggedIn();
  }
}
