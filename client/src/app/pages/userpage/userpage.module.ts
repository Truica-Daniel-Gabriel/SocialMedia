import { NgModule } from '@angular/core';

import { UserpageRoutingModule } from './userpage-routing.module';
import { UserpageComponent } from './userpage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';


@NgModule({
  declarations: [
    UserpageComponent,
    HomeComponent,
    UserProfileComponent,
    ModalDialogComponent,
  ],
  imports: [
    UserpageRoutingModule,
    SharedModule
  ]
})
export class UserpageModule { }
