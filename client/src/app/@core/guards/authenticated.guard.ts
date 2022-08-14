import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AccountSerivce } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad {

  constructor(private readonly router: Router, private readonly accountService:AccountSerivce){}

  canLoad(): boolean {
    if(this.accountService.getAccount.value){

      return true
    }
    this.router.navigate(['auth/login'])
    return false
  }
}
