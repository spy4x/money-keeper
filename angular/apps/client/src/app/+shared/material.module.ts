import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatProgressBarModule,
} from '@angular/material';

const matModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDividerModule,
  MatMenuModule,
  MatSliderModule,
  MatDialogModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [],
  declarations: [],
  exports: [...matModules],
})
export class MaterialModule {}
