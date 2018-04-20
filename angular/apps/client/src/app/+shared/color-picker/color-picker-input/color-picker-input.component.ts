import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatFormFieldControl,
} from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ColorPickerDialogComponent } from '../color-picker-dialog/color-picker-dialog.component';

@Component({
  selector: 'mk-color-picker-input',
  templateUrl: './color-picker-input.component.html',
  styleUrls: ['./color-picker-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ColorPickerInputComponent,
    },
  ],
})
export class ColorPickerInputComponent
  implements OnDestroy, MatFormFieldControl<string>, ControlValueAccessor {
  static nextId = 0;
  stateChanges = new Subject<void>();
  @HostBinding()
  id = `my-color-picker-input-${ColorPickerInputComponent.nextId++}`;
  errorState = false;
  controlType = 'mk-color-picker-input';
  @HostBinding('attr.aria-describedby') describedBy = '';
  propagateChange = (_: any) => {};
  dialogRef: MatDialogRef<ColorPickerDialogComponent, string>;
  sub = new Subscription();

  constructor(
    private fm: FocusMonitor,
    private elRef: ElementRef,
    private cd: ChangeDetectorRef,
    @Optional()
    @Self()
    public ngControl: NgControl,
    private dialog: MatDialog,
  ) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.cd.detectChanges();
    });
    // Setting the value accessor directly (instead of using
    // the providers) to avoid running into a circular import.
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get shouldPlaceholderFloat() {
    return this.focused || !this.empty;
  }

  private _focused = false;

  @Input()
  get focused(): boolean {
    return this._focused;
  }

  set focused(value) {
    this._focused = value;
    this.stateChanges.next();
  }

  private _value: string;

  @Input()
  get value(): string {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.stateChanges.next();
    this.propagateChange(value);
  }

  private _placeholder: string;

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return !this._value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private _required = false;

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.sub.unsubscribe();
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'button') {
      this.elRef.nativeElement.querySelector('button').focus();
    }
    this.openDialog();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  openDialog() {
    this.dialogRef = this.dialog.open(ColorPickerDialogComponent, {
      data: {
        value: this.value,
      },
      autoFocus: false,
      width: '250px',
    });
    this.sub.add(
      this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.value = result;
          this.cd.detectChanges();
        }
      }),
    );
  }
}
