import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProtectedGuard} from './protected.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [ProtectedGuard],
    children: [
      {
        path: '',
        redirectTo: 'expenses',
        pathMatch: 'full'
      },
      {
        path: 'expenses',
        loadChildren: './expences/expences.module#ExpencesModule'
      },
      {
        path: 'groups',
        loadChildren: './groups/groups.module#GroupsModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ProtectedGuard
  ]
})
export class ProtectedRoutingModule {
}
