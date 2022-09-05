import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/@core/models/account';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  public accountSettings!:Account | null;
  public editAccountForm: FormGroup = this.fb.group({
    firstName:[this.acccountService.getAccount.value?.firstName, [Validators.required]],
    lastName:[this.acccountService.getAccount.value?.lastName, [Validators.required]],
    email:[this.acccountService.getAccount.value?.email, [Validators.required, Validators.email]],
    birthday:[''],
    city:[this.acccountService.getAccount.value?.city, [Validators.required]],
  })
  constructor(private readonly acccountService: AccountSerivce, private readonly fb: FormBuilder) { }


  public onEditAccount():void {
    if(this.editAccountForm.valid){
      this.acccountService.editAccount(this.editAccountForm.value).subscribe()
    }
  }
}
