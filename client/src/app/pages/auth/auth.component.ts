import { Component } from '@angular/core';
import { AccountSerivce } from 'src/app/@core/services/account.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private readonly http: AccountSerivce) { }
  public onLogin():void {
    console.log('hello')
  }

}
