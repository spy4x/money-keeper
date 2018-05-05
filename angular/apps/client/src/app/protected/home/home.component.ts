import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../+core/store/app.state';
import { getCategoriesForActiveGroup } from '../expenses/+store/selectors';

enum Widgets {
  spedingsByPerson = 'spendings-by-person',
  spedingsToLimit = 'spendings-to-limit',
}

@Component({
  selector: 'mk-protected-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  categories$ = this.store.pipe(select(getCategoriesForActiveGroup));
  Widgets = Widgets;
  widget = Widgets.spedingsToLimit;
  today = new Date();

  constructor(private store: Store<AppState>, private router: Router) {}

  addCategory() {
    this.router.navigate(['/categories/create']);
  }

  addExpense(category) {
    this.router.navigate([`/expenses/create/${category.id}`]);
  }

  setWidget(widget: Widgets) {
    this.widget = widget;
  }
}
