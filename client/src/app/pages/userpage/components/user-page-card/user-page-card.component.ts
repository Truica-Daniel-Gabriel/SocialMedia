import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from 'src/app/@core/models/message';
import { Post } from 'src/app/@core/models/post';
import { PostService } from 'src/app/@core/services/post.service';
import { UserPostModalComponent } from '../user-post-modal/user-post-modal.component';

@Component({
  selector: 'app-user-page-card',
  templateUrl: './user-page-card.component.html',
  styleUrls: ['./user-page-card.component.scss'],
})
export class UserPageCardComponent implements OnInit {
  @Input() post!: Post;
  public comments: Message[] = [];

  constructor(private readonly dialog: MatDialog, private readonly postService:PostService) {}

  ngOnInit(): void {
    this.postService.getPostComments(this.post._id).subscribe(({postComment})=>{
      this.comments=postComment
    })
  }

  public openPostModal(): void {
    this.dialog.open(UserPostModalComponent, {
      width: '80%',
      height: '80%',
      data: {post:this.post, comments:this.comments},
    });
  }
}
