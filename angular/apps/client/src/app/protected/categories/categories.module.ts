import { NgModule } from '@angular/core';
import { ProtectedSharedModule } from '../+shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [ProtectedSharedModule, CategoriesRoutingModule],
  declarations: [ListComponent, CreateComponent],
})
export class CategoriesModule {}
