import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestAccountRegister } from 'src/app/@core/models/account';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerCredentials = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    city: [],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/), Validators.required],
    ],
  });
  constructor(
    private readonly accountService: AccountSerivce,
    private readonly formBuilder: FormBuilder,
    private readonly sneckBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public onRegister(): void {
    if (this.registerCredentials.valid) {
      this.accountService.register(this.registerCredentials.value as RequestAccountRegister).subscribe({
        next: ({ message }) => {
          this.sneckBar.open(message, '', {
            duration: 5000,
          });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: ({ error }) => {
          this.sneckBar.open(error.message, '', {
            duration: 5000,
          });
        },
      });
    }

  }
}
