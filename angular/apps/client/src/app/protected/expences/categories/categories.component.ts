import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getCategoriesForActiveGroup} from '../+store/selectors';
import {AppState} from '../../../+core/store/app.state';


@Component({
  selector: 'mk-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  categories$ = this.store.pipe(select(getCategoriesForActiveGroup));

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {

  }


  addCategory() {
    this.router.navigate(['/expenses/add-category']);
  }

  addExpense(category) {
    this.router.navigate([`/expenses/add/${category.id}`]);
  }
}
