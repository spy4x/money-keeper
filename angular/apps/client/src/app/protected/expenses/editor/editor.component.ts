import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {filter, first, map} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {ExpensesCreateAction} from '../+store/actions/create.action';
import {ExpensesDeleteAction} from '../+store/actions/delete.action';
import {ExpensesEditAction} from '../+store/actions/edit.action';
import {
  getCategoriesForActiveGroup,
  getCurrencies,
  getExpensesItemsForActiveGroup,
  getTagsForActiveGroup,
  getUsersForActiveGroupWithRoles
} from '../+store/selectors';
import {GroupsSetActiveItemIdAction} from '../../+store/actions/groupsSetActiveItemId.action';
import {getActiveGroup, getGroups} from '../../+store/selectors';
import {AppState} from '../../../+core/store/app.state';
import {getUser} from '../../../+core/store/selectors';
import {MyErrorStateMatcher} from '../../../+shared/helpers/forms.helper';
import {Expense} from '../../../../../../../../+shared/types/expense.interface';
import {Group} from '../../../../../../../../+shared/types/group.interface';


@Component({
  selector: 'mk-expenses-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  groupForm: FormGroup;
  categories$ = this.store.pipe(select(getCategoriesForActiveGroup));
  activeGroup$ = this.store.pipe(select(getActiveGroup));
  currencies$ = this.store.pipe(select(getCurrencies));
  tags$ = this.store.pipe(select(getTagsForActiveGroup));
  groups$ = this.store.pipe(select(getGroups));
  users$ = this.store.pipe(
    select(getUsersForActiveGroupWithRoles),
    map(usersWithRoles => usersWithRoles
      .filter(ur => ur.role === 'owner' || ur.role === 'write')
      .map(ur => ur.user)
    )
  );
  user$ = this.store.pipe(select(getUser));
  matcher = new MyErrorStateMatcher();
  sub = new Subscription();
  expenseId: string;
  groupId: string;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private location: Location) {
  }

  ngOnInit() {
    this.initForm();
    this.sub.add(this.activatedRoute.params
      .pipe(
        filter(v => !!v),
      )
      .subscribe(params => {
        if (params['categoryId']) {
          this.form.patchValue({category: params['categoryId']});
        }
        if (params['expenseId']) {
          this.editExpense(params['expenseId']);
        }
      }));
    this.sub.add(this.activeGroup$.pipe(filter(v => !!v), first())
      .subscribe(activeGroup => {
        this.initGroupForm(activeGroup);
        if (!this.form.value.currency) {
          this.form.patchValue({currency: activeGroup.defaultCurrency.id});
        }
      }));
    this.sub.add(this.user$.pipe(filter(v => !!v), first())
      .subscribe(user => {
        if (!this.form.value.createdBy && !this.expenseId) {
          this.form.patchValue({createdBy: user.id});
        }
      }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cancel(): void {
    this.location.back();
  }

  remove(): void {
    if (!this.expenseId) {
      return;
    }
    const expense = this.getExpenseFromFormValue();
    this.store.dispatch(new ExpensesDeleteAction(expense));
  }

  editExpense(expenseId: string) {
    this.expenseId = expenseId;
    this.sub.add(this.store
      .pipe(select(getExpensesItemsForActiveGroup), filter(v => !!Object.keys(v).length), map(expenses => expenses[expenseId]), first())
      .subscribe(expense => this.initForm(expense)));
  }

  submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }
    const expense = this.getExpenseFromFormValue();
    this.store.dispatch(expense.id ? new ExpensesEditAction(expense) : new ExpensesCreateAction(expense));
  }

  getExpenseFromFormValue(): Expense {
    return {
      id: this.expenseId || undefined,
      value: +this.form.value.value,
      category: this.form.value.category,
      currency: this.form.value.currency,
      comment: this.form.value.comment,
      createdAt: this.form.value.createdAt,
      createdBy: this.form.value.createdBy,
      tags: this.form.value.tags.reduce((acc, cur) => ({...acc, [cur]: true}), {})
    };
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  initForm(expense?: Expense) {
    this.form = this.fb.group({
      'value': [expense ? expense.value : undefined, Validators.required],
      'currency': [expense ? expense.currency.id : undefined, Validators.required],
      'category': [expense ? expense.category.id : undefined, Validators.required],
      'comment': [expense ? expense.comment : undefined],
      'createdAt': [expense ? expense.createdAt : new Date(), Validators.required],
      'tags': [expense ? Object.keys(expense.tags) : []],
      'createdBy': [expense ? expense.createdBy.id : undefined, Validators.required],
    });
  }

  initGroupForm(group: Group) {
    if (this.expenseId) {
      return;
    }
    this.groupId = group.id;
    this.groupForm = this.fb.group({
      'group': [group.id, Validators.required],
    });
    this.sub.add(this.groupForm.valueChanges.pipe(filter(v => v.group !== this.groupId)).subscribe(groupFormValue => {
      this.groupId = groupFormValue.group;
      this.form.patchValue({ // this prevents data from one group appear in another
        category: null,
        createdBy: group.isPersonal ? group.id : null,
        tags: []
      });
      this.store.dispatch(new GroupsSetActiveItemIdAction({groupId: this.groupId, shouldNotify: false}));
    }));
  }
}
