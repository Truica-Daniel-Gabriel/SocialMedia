import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/@core/models/account';
import { Message } from 'src/app/@core/models/message';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})

export class CommentComponent implements OnInit {
  @Input() comment!: Message;
  @Output() replay = new EventEmitter<any>;
  public userDetails!: User;
  public ellipsisText:boolean = true;
  public showReplay:boolean = false;

  constructor(private readonly accountService: AccountSerivce) {}

  ngOnInit(): void {
    this.accountService.getAccountPostInformation(this.comment.providerId).subscribe({
      next: ({ user }) => {
        this.userDetails=user
      }
    });
  }

  public onSendReplay():void {
    this.replay.emit({
      tag:`@${this.userDetails?.firstName} ${this.userDetails?.lastName}`,
      commentId:this.comment._id
    })
  }

  public setEllipsisText():void {
    this.ellipsisText= !this.ellipsisText
  }

  public onShowAndHideReplays():void {
    this.showReplay = !this.showReplay
  }
}
