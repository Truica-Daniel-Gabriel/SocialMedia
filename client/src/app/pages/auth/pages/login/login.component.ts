import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RequestAccountLogin } from 'src/app/@core/models/account';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public profileForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private readonly builder: FormBuilder,
    private readonly accountService: AccountSerivce,
    private readonly router: Router,
    private readonly sneakBar: MatSnackBar
  ) {}

  public onLogin(): void {
    if (this.profileForm.valid) {
      this.accountService.login(this.profileForm.value as RequestAccountLogin).subscribe({
        next: ({ message, account }) => {
          this.sneakBar.open(message, '', {
            duration: 5000,
          });
          if (account.isAdmin) {
            this.router.navigate(['/admin']);
          }
          this.router.navigate(['/userpage']);
        },
        error: ({error}) =>
          this.sneakBar.open(error.message, '', {
            duration: 5000,
          }),
      });
    }
  }
}
