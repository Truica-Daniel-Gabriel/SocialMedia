import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/@core/models/account';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-users-popup',
  templateUrl: './users-popup.component.html',
  styleUrls: ['./users-popup.component.scss'],
})
export class UsersPopupComponent implements OnInit {
  public users!: Account[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private readonly dialogRef: MatDialogRef<Account>,
    private readonly accountService: AccountSerivce,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getSpecificUsers(this.data.users).subscribe(({ users }) => {
      this.users = users;
    });
  }
  public onRedirectToUser(user: Account): void {
    this.router.navigate([`/userpage/profile/${user._id}`])
    this.dialogRef.close()
  }
}
