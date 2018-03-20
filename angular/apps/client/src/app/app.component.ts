import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {filter, first, map, skip, switchMap} from 'rxjs/operators';
import {AuthSetStateAction} from './+core/store/actions/authSetState.action';
import {UserUpdatedAction} from './+core/store/actions/userUpdated.action';
import {AppState} from './+core/store/app.state';
import {getUser} from './+core/store/selectors';
import {unwrapDocSnapshotChanges} from './+shared/helpers/firestore.helper';
import {UserService} from './+core/user/user.service';


@Component({
  selector: 'mk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.init();
  }
}
