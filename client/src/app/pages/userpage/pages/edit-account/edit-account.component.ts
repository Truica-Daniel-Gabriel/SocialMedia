import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/@core/models/account';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  public accountSettings!:Account | null;
  constructor(private readonly acccountService: AccountSerivce) { }

  ngOnInit(): void {
    this.accountSettings= this.acccountService.getAccount.value
  }
}
