import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoriesCreateAction } from '../+store/actions/create.action';
import { AppState } from '../../../+core/store/app.state';
import { MyErrorStateMatcher } from '../../../+shared/helpers/forms.helper';
import { Category } from '../../../../../../../../+shared/types/category.interface';

@Component({
  selector: 'mk-categories-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private location: Location,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  cancel(): void {
    this.location.back();
  }

  submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }
    const category: Category = {
      name: this.form.value.title,
      icon: this.form.value.icon || 'help_outline',
    };
    this.store.dispatch(new CategoriesCreateAction(category));
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  private initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      icon: [''],
    });
  }
}
