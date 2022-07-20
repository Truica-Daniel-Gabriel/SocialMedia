import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from '../api/http.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSerivce {
  constructor(private readonly http: HttpService) {}

  public get(): Observable<any> {
    return this.http.get('/').pipe(
      tap((res)=>{
        console.log(res)
      })
    );
  }
}
