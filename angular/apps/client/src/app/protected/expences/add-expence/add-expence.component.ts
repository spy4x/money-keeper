import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {ExpensesCreateAction} from '../+store/actions/expensesCreate.action';
import {getCategoriesForActiveGroup, getCurrencies} from '../+store/selectors';
import {AppState} from '../../../+core/store/app.state';
import {MyErrorStateMatcher} from '../../../+shared/helpers/forms.helper';
import {Expense} from '../../../../../../../../+shared/types/expense.interface';


@Component({
  selector: 'mk-add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenceComponent implements OnInit, OnDestroy {
  form: FormGroup;
  categories$ = this.store.pipe(select(getCategoriesForActiveGroup));
  currencies$ = this.store.pipe(select(getCurrencies));
  matcher = new MyErrorStateMatcher();
  sub = new Subscription();

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.initForm();
    this.sub.add(this.activatedRoute.params
      .pipe(
        filter(v => !!v),
        map(p => p['categoryId'])
      )
      .subscribe(catId => this.form.patchValue({category: catId})));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }
    const expense: Expense = {
      value: +this.form.value.value,
      category: this.form.value.category,
      currency: this.form.value.currency,
      comment: this.form.value.comment,
      createdAt: this.form.value.date,
      tags: {}
    };
    this.store.dispatch(new ExpensesCreateAction(expense));
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  initForm() {
    this.form = this.fb.group({
      'value': [undefined, Validators.required],
      'currency': ['czk', Validators.required],
      'category': [undefined, Validators.required],
      'comment': [undefined],
      'date': [new Date(), Validators.required]
    });
  }
}
