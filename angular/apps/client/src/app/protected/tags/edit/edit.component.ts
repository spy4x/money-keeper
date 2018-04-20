import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../+shared/helpers/forms.helper';
import { Tag } from '@root/+shared/types/tag.interface';

@Component({
  selector: 'mk-tags-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {
  @Input() tag: Tag;
  @Output() save = new EventEmitter<Tag>();
  @Output() cancel = new EventEmitter<void>();
  editTag: Tag;
  form: FormGroup;
  formId = ('form-' + Math.random()).replace('.', '');

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const nameValue = this.tag ? this.tag.name : '';
    const colorValue = this.tag ? this.tag.color : '';
    this.form = this.fb.group({
      name: [nameValue, Validators.required],
      color: [colorValue, Validators.required],
    });
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  submit() {
    if (this.isSubmitDisabled()) {
      return;
    }

    this.editTag = {
      name: this.form.value.name,
      color: this.form.value.color,
    };
    this.save.emit({ ...this.tag, ...this.editTag });
  }
}
