import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {unwrapCollectionSnapshotChanges} from '../../../+shared/helpers/firestore.helper';
import {Expense} from '../../data-access/expense.interface';


@Component({
  selector: 'mk-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit, OnDestroy {

  data = [];

  view: any[] = [355, 355];

  // pie
  showLabels = true;
  categories: any[];
  sub = new Subscription();

  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private cd: ChangeDetectorRef) {
    // this.sub.add(this.afAuth.authState.subscribe(user => {
    //   this.db.collection<Expense>(`users/${user.uid}/expenses`)
    //     .snapshotChanges()
    //     .pipe(
    //       map(unwrapCollectionSnapshotChanges)
    //     ).subscribe((expenses => {
    //     this.db.collection(`users/${user.uid}/categories`)
    //       .snapshotChanges()
    //       .pipe(
    //         map(unwrapCollectionSnapshotChanges)
    //       )
    //       .subscribe(categories => {
    //         for (const category of categories) {
    //           let sum = 0;
    //           for (const expense of expenses) {
    //             if (expense.category === category.id) {
    //               sum += expense.value;
    //             }
    //           }
    //           this.data = [...this.data, {
    //             name: category.name,
    //             value: sum
    //           }];
    //           sum = 0;
    //         }
    //         this.cd.detectChanges();
    //       });
    //   }));
    // }));
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
