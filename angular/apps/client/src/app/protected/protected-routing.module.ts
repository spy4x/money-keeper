import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProtectedGuard} from './protected.guard';
import {ProtectedComponent} from './protected.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [ProtectedGuard],
    component: ProtectedComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesModule'
      },
      {
        path: 'categories',
        loadChildren: './categories/categories.module#CategoriesModule'
      },
      {
        path: 'tags',
        loadChildren: './tags/tags.module#TagsModule'
      },
      {
        path: 'groups',
        loadChildren: './groups/groups.module#GroupsModule'
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
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
