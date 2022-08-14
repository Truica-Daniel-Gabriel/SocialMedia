import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from '../api/http.service';
import {
  RequestAccountLogin,
  RequestAccountRegister,
  ResponseAccountLogin,
  Account,
  ResponseAccountRegister,
  ResponseAccountUpdate,
} from '../models/account';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSerivce {
  private readonly account$ = new BehaviorSubject<Account | null>(null);
  private jwtToken!: string;

  constructor(
    private readonly http: HttpService,
    private readonly sessionService: SessionStorageService,
    private readonly router: Router
  ) {}

  public login(account: RequestAccountLogin): Observable<ResponseAccountLogin> {
    return this.http.post('/auth/login', account).pipe(
      tap(({ account, jwtToken }) => {
        console.log('aci', account, jwtToken);
        this.sessionService.set({ key: 'account', value: JSON.stringify(account) });
        this.sessionService.set({ key: 'jwtToken', value: jwtToken });

        this.jwtToken = jwtToken;
        this.account$.next(account);
      })
    );
  }

  public register(account: RequestAccountRegister): Observable<ResponseAccountRegister> {
    return this.http.post('/auth/register', account);
  }

  public isLoggedIn(): void {
    const loggedUser: string | null = this.sessionService.get('account');
    const jwtToken: string | null = this.sessionService.get('jwtToken');

    if (loggedUser && jwtToken) {
      this.account$.next(JSON.parse(loggedUser));
      this.jwtToken = jwtToken;
    }
  }

  public logout(): void {
    this.account$.next(null);
    this.sessionService.delete('account');
    this.sessionService.delete('jwtToken');
    this.router.navigate(['/auth/login']);
  }

  public editAccountImage(image: string | null | ArrayBuffer): Observable<ResponseAccountUpdate> {
    return this.http.patch(`/user/editAccountImage/${this.account$.value?.id}`, {profilePicture:image}).pipe(
      tap(({ account }) => {
        this.account$.next(account);
        this.sessionService.set({key:'account', value: JSON.stringify(account)});
      })
    );
  }

  public get getAccount(): BehaviorSubject<Account | null> {
    return this.account$;
  }
}
