import { Component, Input, OnInit } from '@angular/core';
import { ResponseGetUser, User } from 'src/app/@core/models/account';
import { ReplayResponse } from 'src/app/@core/models/message';
import { AccountSerivce } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-comment-replay',
  templateUrl: './comment-replay.component.html',
  styleUrls: ['./comment-replay.component.scss']
})
export class CommentReplayComponent implements OnInit {
  @Input() replay!:ReplayResponse;
  public commentUser:User | undefined;
  public ellipsisText:boolean = true;
  public showReplay:boolean = false;
  constructor(private readonly accountService:AccountSerivce) { }

  ngOnInit(): void {
    this.accountService.getAccountPostInformation(this.replay.providerId)
    .subscribe(({user})=>{
      this.commentUser=user;
    })
  }

  public setEllipsisText():void {
    this.ellipsisText= !this.ellipsisText
  }

  public onShowAndHideReplays():void {
     this.showReplay = !this.showReplay
  }

}
