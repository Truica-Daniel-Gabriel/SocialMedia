import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AccountSerivce } from 'src/app/@core/services/account.service';
import { ModalDialogComponent } from 'src/app/pages/userpage/components/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly account: AccountSerivce
  ) {}

  public openDialog(): void {
    this.dialog.open(ModalDialogComponent, {
      width: '600px',
      height: '550px',
    });
  }

  public OnLogout(): void {
    this.account.logout();
  }
}
