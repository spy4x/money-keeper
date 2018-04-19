import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

interface RGB {
  r: number;
  g: number;
  b: number;
}

@Component({
  selector: 'mk-color-picker-inline',
  templateUrl: './color-picker-inline.component.html',
  styleUrls: ['./color-picker-inline.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerInlineComponent),
      multi: true,
    },
  ],
})
export class ColorPickerInlineComponent
  implements OnDestroy, ControlValueAccessor {
  form: FormGroup;
  propagateChange = (_: any) => {};
  selectedColor: RGB;
  @Output() changed = new EventEmitter<string>();
  opacity: number = 65;
  sub = new Subscription();
  private colors: RGB[] = [
    {
      r: 0,
      g: 31,
      b: 63,
    },
    {
      r: 0,
      g: 116,
      b: 217,
    },
    {
      r: 127,
      g: 219,
      b: 255,
    },
    {
      r: 57,
      g: 204,
      b: 204,
    },
    {
      r: 61,
      g: 153,
      b: 112,
    },
    {
      r: 46,
      g: 204,
      b: 64,
    },
    {
      r: 1,
      g: 255,
      b: 112,
    },
    {
      r: 255,
      g: 220,
      b: 0,
    },
    {
      r: 255,
      g: 133,
      b: 27,
    },
    {
      r: 255,
      g: 65,
      b: 54,
    },
    {
      r: 133,
      g: 20,
      b: 75,
    },
    {
      r: 240,
      g: 18,
      b: 190,
    },
    {
      r: 177,
      g: 13,
      b: 201,
    },
    {
      r: 17,
      g: 17,
      b: 17,
    },
    {
      r: 170,
      g: 170,
      b: 170,
    },
    {
      r: 221,
      g: 221,
      b: 221,
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      custom: [this.value],
    });
    this.sub.add(
      this.form.valueChanges.subscribe(formValue =>
        this.setCustomValue(formValue.custom),
      ),
    );
  }

  _value: string;

  @Input()
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getColors() {
    return this.colors.map(c => ({
      rgbaString: this.getRGBAString(c, this.opacity),
      rgb: c,
    }));
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setCustomValue(value: string): void {
    this.value = value;
    this.selectedColor = null;
  }

  setLibraryValue(value: { rgbaString: string; rgb: RGB }): void {
    this.value = value.rgbaString;
    this.selectedColor = value.rgb;
  }

  setOpacity(opacity: number) {
    this.opacity = opacity;
    if (this.selectedColor) {
      this.value = this.getRGBAString(this.selectedColor, opacity);
    }
  }

  getRGBAString(color: RGB, opacity: number): string {
    return `rgba(${color.r},${color.g},${color.b},${opacity / 100})`;
  }
}
