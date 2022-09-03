import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseGetUser } from 'src/app/@core/models/account';
import { Message } from 'src/app/@core/models/message';
import { Post, SetLikeResponse } from 'src/app/@core/models/post';
import { AccountSerivce } from 'src/app/@core/services/account.service';
import { PostService } from 'src/app/@core/services/post.service';
import { UserPostModalComponent } from '../user-post-modal/user-post-modal.component';
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  public AccountInfo: any;
  public smallDescription: boolean = true;
  public likePost: boolean = false;
  public comments!: Message[];

  constructor(
    private readonly accountService: AccountSerivce,
    private readonly postService: PostService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accountService.getAccountPostInformation(this.post.userId).subscribe({
      next: ({ user }: ResponseGetUser) => {
        this.AccountInfo = user;
      },
    });
    if (this.post.likes.includes(this.accountService.getAccount.value!._id)) {
      this.likePost = true;
    }
    this.postService.getPostComments(this.post._id).subscribe({
      next: ({ postComment }) => {
        this.comments = postComment;
      },
      error: ({ error }) => {
        console.log('aci eroarea', error.message);
      },
    });
  }

  public onDescriptionSize(): void {
    this.smallDescription = !this.smallDescription;
  }

  public onOpenModal(): void {
    this.dialog.open(UserPostModalComponent, {
      width: '80%',
      height: '80%',
      data: { post: this.post, comments: this.comments },
    });
  }

  public onSetLike(): void {
    this.postService.setLikesPost(this.post._id).subscribe({
      next: ({ userId, like }: SetLikeResponse) => {
        if (like) {
          this.post.likes.push(userId);
        } else {
          this.post.likes = this.post.likes.filter((likeId: string) => likeId !== userId);
        }
        this.likePost = like;
      },
      error: ({ error }) => {
        this.snackBar.open(error.message, '', {
          duration: 5000,
        });
      },
    });
  }
}
