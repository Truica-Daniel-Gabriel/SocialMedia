import { Component, OnInit } from '@angular/core';
import { AccountSerivce } from 'src/app/@core/services/account.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  constructor(private readonly http: AccountSerivce) { }
  ngOnInit(): void {
     this.http.get().subscribe()
  }

}
