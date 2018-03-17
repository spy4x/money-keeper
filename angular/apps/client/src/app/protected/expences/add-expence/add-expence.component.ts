import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {filter, map, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {unwrapCollectionSnapshotChanges} from '../../../+shared/helpers/firestore.helper';
import {MyErrorStateMatcher} from '../../../+shared/helpers/forms.helper';
import {ActiveGroupService} from '../../active-group.service';
import {ActiveUserService} from '../../active-user.service';
import {Expense} from '../../data-access/expense.interface';


@Component({
  selector: 'mk-add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExpenceComponent implements OnInit, OnDestroy {
  form: FormGroup;
  expensesCollection = this.db.collection<Expense>(`${this.activeGroupService.getPath()}/expenses`);
  expenses$ = this.activeGroupService.asPath$.pipe(
    switchMap(groupPath => this.db.collection(`${groupPath}/expenses`).snapshotChanges()),
    map(unwrapCollectionSnapshotChanges)
  );
  categories$ = this.activeGroupService.asPath$.pipe(
    switchMap(groupPath => this.db.collection(`${groupPath}/categories`).snapshotChanges()),
    map(unwrapCollectionSnapshotChanges)
  );
  currencies$ = this.db.collection(`currencies`).snapshotChanges().pipe(map(unwrapCollectionSnapshotChanges));
  matcher = new MyErrorStateMatcher();
  sub = new Subscription();

  constructor(private router: Router,
              private fb: FormBuilder,
              private db: AngularFirestore,
              private activeGroupService: ActiveGroupService,
              private activeUserService: ActiveUserService,
              private activatedRoute: ActivatedRoute) {
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
      category: this.db.doc(`${this.activeGroupService.getPath()}/categories/${this.form.value.category}`).ref,
      currency: this.db.doc(`currencies/${this.form.value.currency}`).ref,
      comment: this.form.value.comment,
      createdBy: this.activeUserService.getRef(),
      createdAt: this.form.value.date,
      tags: {}
    };
    console.log(`expense:`, expense);
    this.expensesCollection.add(expense)
      .then(docRef => {
        console.log('Expense added: ', docRef.id);
        this.router.navigate(['/expenses/logs']);
      })
      .catch(function (error) {
        console.error('Error adding expense: ', error);
      });
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  goToMainPage() {
    this.router.navigate(['/']);
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
