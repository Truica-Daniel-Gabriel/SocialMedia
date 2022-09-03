import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/@core/models/account';

import { AccountSerivce } from 'src/app/@core/services/account.service';
import { ModalDialogComponent } from 'src/app/pages/userpage/components/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public linkToUser!: string;
  public users!: User[];
  public filteredUsers!: User[];
  public userId:string = this.account.getAccount.value!._id

  constructor(private readonly dialog: MatDialog, private readonly account: AccountSerivce, private router: Router) {}

  ngOnInit(): void {
    this.account.getAllUsers()?.subscribe(({ users }) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  public onUserPage(): void {
    this.router.navigate([`/userpage/profile/${this.account.getAccount.value!._id}`]);
  }

  public openDialog(): void {
    this.dialog.open(ModalDialogComponent, {
      width: '600px',
      height: '550px',
    });
  }

  public onSettings(): void {
    this.router.navigate([`/userpage/profile/${this.account.getAccount.value!._id}/editAccount`])
  }

  public onFilterSearchBar(value: string): void {
    this.filteredUsers = this.users.filter((elem) => {
      if(elem.firstName.includes(value) || elem.lastName.includes(value)){
          return elem;
      }
      return
    });
  }

  public onNavigate(userId: string): void {
    this.router.navigate([`/userpage/profile/${userId}`]);
  }

  public OnLogout(): void {
    this.account.logout();
  }
}
