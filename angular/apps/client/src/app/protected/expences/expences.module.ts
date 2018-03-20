import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ProtectedSharedModule} from '../+shared/shared.module';
import {SharedModule} from '../../+shared/shared.module';
import {AddExpenceComponent} from './add-expence/add-expence.component';
import {CategoriesComponent} from './categories/categories.component';
import {MainCreateCategoryComponent} from './create-category/create-category.component';
import {ExpencesRoutingModule} from './expences-routing.module';
import {ExpencesComponent} from './expences.component';
import {LogComponent} from './log/log.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    CommonModule,
    ExpencesRoutingModule,
    SharedModule,
    ProtectedSharedModule,
    NgxChartsModule
  ],
  declarations: [CategoriesComponent, AddExpenceComponent, LogComponent, StatisticsComponent, ExpencesComponent, MainCreateCategoryComponent]
})
export class ExpencesModule {
}
