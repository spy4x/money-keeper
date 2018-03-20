import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AutofocusDirective} from './components/autofocus.directive';
import {MaterialModule} from './material.module';
import {TruncatePipe} from './pipes/truncate.pipe';


@NgModule({
  imports: [],
  declarations: [
    AutofocusDirective,
    TruncatePipe
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    AutofocusDirective,
    TruncatePipe
  ]
})
export class SharedModule {
}
