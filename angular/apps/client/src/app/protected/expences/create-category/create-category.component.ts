import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {CategoriesCreateAction} from '../+store/actions/categoriesCreate.action';
import {AppState} from '../../../+core/store/app.state';
import {MyErrorStateMatcher} from '../../../+shared/helpers/forms.helper';
import {Category} from '../../../../../../../../+shared/types/category.interface';


@Component({
  selector: 'mk-main-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainCreateCategoryComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private fb: FormBuilder,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.initForm();
  }

  submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }
    const category: Category = {
      name: this.form.value.title,
      icon: this.form.value.icon || 'help_outline'
    };
    this.store.dispatch(new CategoriesCreateAction(category));
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  goToMainPage() {
    this.router.navigate(['/']);
  }

  private initForm() {
    this.form = this.fb.group({
      'title': ['', Validators.required],
      'icon': ['']
    });
  }
}
