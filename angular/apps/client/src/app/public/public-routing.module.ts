import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PublicGuard} from './public.guard';
import {SignInComponent} from './sign-in/sign-in.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [PublicGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    PublicGuard
  ]
})
export class PublicRoutingModule {
}
