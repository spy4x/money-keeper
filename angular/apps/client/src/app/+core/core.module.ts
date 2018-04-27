import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../+shared/shared.module';
import { environment } from '../../environments/environment';

import { CoreRoutingModule } from './core-routing.module';
import { CoreStoreModule } from './store/module';
import { UserService } from './user/user.service';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.type === 'prod',
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreStoreModule,
    SharedModule,
  ],
  declarations: [],
  exports: [StoreModule, RouterModule],
  providers: [UserService],
})
export class CoreModule {}
