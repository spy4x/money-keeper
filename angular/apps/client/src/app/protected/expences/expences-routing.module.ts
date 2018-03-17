import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddExpenceComponent} from './add-expence/add-expence.component';
import {CategoriesComponent} from './categories/categories.component';
import {ExpencesComponent} from './expences.component';
import {LogComponent} from './log/log.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {MainCreateCategoryComponent} from './create-category/create-category.component';


const routes: Routes = [
  {
    path: '',
    component: ExpencesComponent,
    children: [
      {
        path: '',
        component: CategoriesComponent
      },
      {
        path: 'logs',
        component: LogComponent
      },
      {
        path: 'add',
        component: AddExpenceComponent
      },
      {
        path: 'add/:categoryId',
        component: AddExpenceComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'add-category',
        component: MainCreateCategoryComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpencesRoutingModule {
}
