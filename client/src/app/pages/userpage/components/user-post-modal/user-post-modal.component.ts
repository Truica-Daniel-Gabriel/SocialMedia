import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/@core/models/account';
import { Message } from 'src/app/@core/models/message';
import { Post } from 'src/app/@core/models/post';
import { AccountSerivce } from 'src/app/@core/services/account.service';
import { PostService } from 'src/app/@core/services/post.service';

@Component({
  selector: 'app-user-post-modal',
  templateUrl: './user-post-modal.component.html',
  styleUrls: ['./user-post-modal.component.scss'],
})
export class UserPostModalComponent implements OnInit {
  public post: Post = this.data.post;
  public AccountInfo: User | undefined;
  public likePost: boolean = false;
  public replayUser: any = null;
  public createComment: string = '';
  public comments: Message[] = this.data.comments;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private readonly accountService: AccountSerivce,
    private readonly postService: PostService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.getAccountPostInformation(this.post.userId).subscribe(({ user }) => {
      this.AccountInfo = user;
    });

    this.accountService.getAccount.subscribe(user =>{
      if (this.post.likes.includes(user!._id)) {
        this.likePost = true;
      }

    })
  }

  public onSetReplay(): boolean {
    if (this.createComment.length === 0) {
      this.replayUser = '';
    }

    return this.createComment.length > 0 && this.replayUser;
  }

  public onSetLike(): void {
    this.postService.setLikesPost(this.post._id).subscribe({
      next: ({ like, userId }) => {
        this.likePost = like;
        if (like) {
          this.post.likes.push(userId);
        } else {
          this.post.likes = this.post.likes.filter((likeId: string) => likeId !== userId);
        }
      },
      error: ({ error }) => {
        this.snackBar.open(error.message, '', {
          duration: 5000,
        });
      },
    });
  }

  public setReplay(userReplay: any): void {
    this.replayUser = userReplay;
    this.createComment = ' ';
  }

  public onSendCommnent(): void {
    if (this.createComment) {
      this.postService
        .createComment({
          postId: this.post._id,
          providerId: this.AccountInfo?._id,
          message: this.createComment,
          commentReplay: this.replayUser,
        })
        .subscribe({
          next: ({ comments }) => {
            this.comments = comments;
          },
          error: ({ error }) => {
            this.snackBar.open(error.message, '', {
              duration: 5000,
            });
          },
        });
    }
    this.createComment = '';
  }
}
