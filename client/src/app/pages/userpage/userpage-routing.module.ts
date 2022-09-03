import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { HomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserpageComponent } from './userpage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: UserpageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },

  {
    path: 'profile/:id',
    component: UserpageComponent,
    children: [
      {
        path: '',
        component: UserProfileComponent,
      },
      {
        path: 'editAccount',
        component: EditAccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserpageRoutingModule {}
