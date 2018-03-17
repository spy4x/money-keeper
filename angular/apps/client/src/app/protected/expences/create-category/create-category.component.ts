import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MyErrorStateMatcher} from '../../../+shared/helpers/forms.helper';
import {ActiveGroupService} from '../../active-group.service';
import {ActiveUserService} from '../../active-user.service';
import {Category} from '../../data-access/category.interface';
import {AngularFirestore} from 'angularfire2/firestore';


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
  categoriesCollection = this.db.collection<Category>(`${this.activeGroupService.getPath()}/categories`);

  constructor(private router: Router,
              private fb: FormBuilder,
              private db: AngularFirestore,
              private activeGroupService: ActiveGroupService,
              private activeUserService: ActiveUserService) {
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
      icon: this.form.value.icon || 'help_outline',
      createdAt: new Date(),
      createdBy: this.activeUserService.getRef(),
    };

    console.log(`category:`, category);


    this.categoriesCollection.add(category)
      .then(docRef => {
        console.log('Category added: ', docRef.id);
        this.router.navigate(['/expenses']);
      })
      .catch(function (error) {
        console.error('Error adding category: ', error);
      });
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
