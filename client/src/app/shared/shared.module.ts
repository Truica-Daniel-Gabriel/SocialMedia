import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatSliderModule,
  MatIconModule,
  MatSnackBarModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
];

const DECLARATIONS = [NavbarComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [MODULES, RouterModule, MatAutocompleteModule],
  providers: [MatDatepickerModule],
  exports: [MODULES, DECLARATIONS],
})
export class SharedModule {}
