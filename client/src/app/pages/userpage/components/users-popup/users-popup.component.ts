import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from 'express';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-users-popup',
  templateUrl: './users-popup.component.html',
  styleUrls: ['./users-popup.component.scss'],
})
export class UsersPopupComponent implements OnInit {
  public users!: any;
  public getAccount!: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private readonly accountService: AccountSerivce,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getSpecificUsers(this.data.users).subscribe(({ users }) => {
      this.users = users;
      console.log('aa', users);
    });
  }
  // public onRedirectToUser(user: any): void {
  //   console.log(user);

  // }
}
