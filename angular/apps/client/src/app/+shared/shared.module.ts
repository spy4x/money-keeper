import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerDialogComponent } from './color-picker/color-picker-dialog/color-picker-dialog.component';
import { ColorPickerInlineComponent } from './color-picker/color-picker-inline/color-picker-inline.component';
import { ColorPickerInputComponent } from './color-picker/color-picker-input/color-picker-input.component';
import { AutofocusDirective } from './components/autofocus.directive';
import { MaterialModule } from './material.module';
import { IsTouchDevicePipe } from './pipes/isTouchDevice.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

const entryComponents = [ColorPickerDialogComponent];

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [
    AutofocusDirective,
    TruncatePipe,
    IsTouchDevicePipe,
    ColorPickerInputComponent,
    ColorPickerInlineComponent,
    ColorPickerDialogComponent,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    AutofocusDirective,
    TruncatePipe,
    IsTouchDevicePipe,
    ColorPickerInputComponent,
    ColorPickerInlineComponent,
    ColorPickerDialogComponent,
  ],
  entryComponents,
})
export class SharedModule {
  static getEntryComponents() {
    return entryComponents;
  }
}
