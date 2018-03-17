import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {filter, map, switchMap} from 'rxjs/operators';
import {unwrapCollectionSnapshotChanges} from '../../../+shared/helpers/firestore.helper';
import {ActiveGroupService} from '../../active-group.service';


@Component({
  selector: 'mk-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  categories = this.activeOwnerService
    .asPath$
    .pipe(
      filter(v => !!v),
      switchMap(path => this.db.collection(`${path}/categories`)
        .snapshotChanges()
        .pipe(
          map(unwrapCollectionSnapshotChanges)
        )
      )
    );

  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private router: Router,
              private activeOwnerService: ActiveGroupService) {
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
