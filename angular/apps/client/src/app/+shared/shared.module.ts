import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MaterialModule} from './material.module';
import {AutofocusDirective} from './components/autofocus.directive';
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
    NgxChartsModule,
    RouterModule,
    AutofocusDirective,
    TruncatePipe
  ]
})
export class SharedModule {
}
