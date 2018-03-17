import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatIconModule, MatInputModule, MatListModule,
  MatNativeDateModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonToggleModule
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
  MatButtonToggleModule,
];

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    ...matModules
  ]
})
export class MaterialModule {
}
