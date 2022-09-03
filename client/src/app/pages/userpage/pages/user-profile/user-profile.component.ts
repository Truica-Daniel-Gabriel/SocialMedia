import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/@core/models/account';
import { Post } from 'src/app/@core/models/post';
import { AccountSerivce } from 'src/app/@core/services/account.service';
import { EncodedImageFileService } from 'src/app/@core/services/encoded-image-file.service';
import { PostService } from 'src/app/@core/services/post.service';
import { UsersPopupComponent } from '../../components/users-popup/users-popup.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public userPosts: Post[] = [];
  public user!: Account | null;
  public otherAccount!: boolean;
  public followed!: boolean;
  private accountSubscription!: Subscription;
  private userPostsSubscription!: Subscription;
  private paramId!: string | null;

  constructor(
    private readonly account: AccountSerivce,
    private readonly encodedImageFileService: EncodedImageFileService,
    private readonly snackBar: MatSnackBar,
    private readonly postsSerivce: PostService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.paramId = params.get('id');
      this.accountSubscription = this.account.getAccount.subscribe((account: Account | null) => {
        if (account?._id === this.paramId) {
          this.user = account;
          this.otherAccount = false;
        } else {
          this.otherAccount = true;
          this.account.getUserAccount(this.paramId)?.subscribe({
            next: ({ user }) => {
              this.user = user;
            },

            error: ({ error }) => {
              this.snackBar.open(error.message, '', {
                duration: 5000,
              });
            },
          });
        }

        if (this.paramId) {
          if (account?.follow_ups.includes(this.paramId)) {
            this.followed = true;
          } else {
            this.followed = false;
          }
        }
      });

      this.userPostsSubscription = this.postsSerivce.getUserPosts(params.get('id')).subscribe(({ posts }) => {
        this.userPosts = posts;
      });
    });
  }
  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
    this.userPostsSubscription.unsubscribe();
  }

  public editOrFollow(): void {
    if (!this.otherAccount) {
      this.router.navigate([`editAccount`], { relativeTo: this.route });
    } else {
      this.account.setFollow(this.paramId)?.subscribe({
        next: ({ follow }) => {
          this.followed = follow;
        },
        error: ({ error }) => {
          this.snackBar.open(error.message, '', {
            duration: 5000,
          });
        },
      });
    }
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

  public onModalUser(follow:boolean): void {
    this.dialog.open(UsersPopupComponent, {
      width: '500px',
      height: '60%',
      data: { users: follow ? this.user?.follow_ups : this.user?.followers },
    });
  }
}
