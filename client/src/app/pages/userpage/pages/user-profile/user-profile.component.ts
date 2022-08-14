import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/@core/models/account';
import { AccountSerivce } from 'src/app/@core/services/account.service';
import { EncodedImageFileService } from 'src/app/@core/services/encoded-image-file.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public userPosts: any = [];
  public user!: Account | null;
  private accountSubscription!:Subscription;

  constructor(
    private readonly account: AccountSerivce,
    private readonly encodedImageFileService: EncodedImageFileService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountSubscription= this.account.getAccount.subscribe((account:Account | null)=>{
      this.user = account
      console.log('ss',account, this.user);

    })
  }

  public onChangeImage(event: EventTarget | null): void {
    const file = (event as HTMLInputElement).files?.[0];
    if (file) {
      this.encodedImageFileService
        .convertToBase64(file)
        ?.then((convertedImage: string | null | ArrayBuffer) => {
          this.account.editAccountImage(convertedImage).subscribe({
            next: ({ message }) => {
              this.snackBar.open(`${message}`, '', {
                duration: 4000,
              });
            },
            error: ({ error }) => {
              this.snackBar.open(error.message, '', {
                duration: 4000,
              });
            },
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }
}
