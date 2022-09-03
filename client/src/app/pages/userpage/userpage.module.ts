import { NgModule } from '@angular/core';

import { UserpageRoutingModule } from './userpage-routing.module';
import { UserpageComponent } from './userpage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { UserPostModalComponent } from './components/user-post-modal/user-post-modal.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserPageCardComponent } from './components/user-page-card/user-page-card.component';
import { CommentReplayComponent } from './components/comment-replay/comment-replay.component';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { UsersPopupComponent } from './components/users-popup/users-popup.component';


@NgModule({
  declarations: [
    UserpageComponent,
    HomeComponent,
    UserProfileComponent,
    ModalDialogComponent,
    PostCardComponent,
    UserPostModalComponent,
    CommentComponent,
    UserPageCardComponent,
    CommentReplayComponent,
    EditAccountComponent,
    UsersPopupComponent,
  ],
  imports: [
    UserpageRoutingModule,
    SharedModule
  ]
})
export class UserpageModule { }
