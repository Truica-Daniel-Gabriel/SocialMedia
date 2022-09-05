import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  ResponseGetUser,
  ResponseGetAllUsers,
  ResponseGetOtherUser,
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
    private readonly router: Router,
    private readonly seackBar: MatSnackBar
  ) {}

  public login(account: RequestAccountLogin): Observable<ResponseAccountLogin> {
    return this.http.post('/auth/login', account).pipe(
      tap(({ account, jwtToken }) => {
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
    return this.http.patch(`/user/editAccountImage/${this.account$.value?._id}`, { profilePicture: image }).pipe(
      tap(({ account }) => {
        this.account$.next(account);
        this.sessionService.set({ key: 'account', value: JSON.stringify(account) });
      })
    );
  }

  public setFollow(friendId: string | null): Observable<any> | void {
    if (friendId) {
      let queryParams = new HttpParams();
      queryParams = queryParams.append('userId', this.account$.value!._id);
      queryParams = queryParams.append('friendId', friendId);
      return this.http
        .patch(`/user/follow`, null, {
          params: queryParams,
        })
        .pipe(
          tap(() => {
            this.getUserAccount(this.account$.value?._id)?.subscribe();
          })
        );
    }
  }

  public editAccount(userDetails: Account): Observable<ResponseAccountUpdate> {
    return this.http.put(`/user/editAccount/${this.account$.value?._id}`, userDetails).pipe(
      tap({
        next: ({ message, account }) => {
          this.seackBar.open(message, '', {
            duration: 5000,
          });
          this.account$.next(account);
          this.sessionService.set({ key: 'account', value: JSON.stringify(account) });
          this.router.navigate([`/userpage/profile/${account._id}`]);
        },
        error: ({ message }) => {},
      })
    );
  }

  public getUserAccount(id: string | null | undefined): Observable<ResponseGetOtherUser> | void {
    if (id) {
      return this.http.get(`/user/getUser/${id}`).pipe(
        tap(({ user }) => {
          if (this.account$.value?._id === user._id) {
            this.account$.next(user);
            this.sessionService.set({ key: 'account', value: JSON.stringify(user) });
          }
        })
      );
    }
  }

  public getSpecificUsers(users: any): Observable<any> {
    return this.http.post('/user/getSepcificUsers', { users });
  }

  public getAllUsers(): Observable<ResponseGetAllUsers> | void {
    if (this.account$.value?._id) {
      return this.http.get(`/user/getAllUsers/${this.account$.value?._id}`);
    }
  }

  public getAccountPostInformation(id: string): Observable<ResponseGetUser> {
    return this.http.get(`/user/profilePost/${id}`);
  }

  public get getAccount(): BehaviorSubject<Account | null> {
    return this.account$;
  }

  public get getJwtToken(): string {
    return this.jwtToken;
  }
}
