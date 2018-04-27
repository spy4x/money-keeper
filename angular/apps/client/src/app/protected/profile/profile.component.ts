import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { setStateProperties } from '@client/+shared/helpers/state.helper';
import { ProfileUpdateAction } from '@client/protected/profile/+store/actions/profileUpdate.action';
import { select, Store } from '@ngrx/store';
import { User } from '@root/+shared/types/user.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { UserSignedOutAction } from '../../+core/store/actions/userSignedOut.action';
import { AppState } from '../../+core/store/app.state';
import { getUser } from '../../+core/store/selectors';
import { ProfileAvatarUploadAction } from '@client/protected/profile/+store/actions/avatarUpload.action';

@Component({
  selector: 'mk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$ = this.store.pipe(select(getUser));
  form: FormGroup;
  sub = new Subscription();
  lastSavedUser: User;
  isAvatarUploadInProgress$ = this.store.pipe(
    select(s => s.protected.profile.isAvatarUploadInProgress),
  );
  uploadProgress$ = this.store.pipe(
    select(s => s.protected.profile.uploadProgress$),
  );

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.sub.add(
      this.user$.subscribe(user => {
        this.initForm(user);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  initForm(user: User) {
    this.form = this.fb.group({
      displayName: [user.displayName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
    });
    this.lastSavedUser = user;
  }

  submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }

    this.lastSavedUser = setStateProperties(this.lastSavedUser, {
      displayName: this.form.value.displayName,
      email: this.form.value.email,
    });
    this.store.dispatch(new ProfileUpdateAction(this.lastSavedUser));
  }

  isCancelDisabled(): boolean {
    return (
      this.lastSavedUser.displayName === this.form.value.displayName &&
      this.lastSavedUser.email === this.form.value.email
    );
  }

  cancel(): void {
    this.initForm(this.lastSavedUser);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.store.dispatch(new ProfileAvatarUploadAction(file));
  }

  signOut(): void {
    this.store.dispatch(new UserSignedOutAction());
  }
}
