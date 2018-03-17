import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../+shared/shared.module';
import {HomeComponent} from './home/home.component';
import {PublicRoutingModule} from './public-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';


@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    SignInComponent,
  ]
})
export class PublicModule {
}
