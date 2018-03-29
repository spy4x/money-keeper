import {NgModule} from '@angular/core';
import {ProtectedSharedModule} from '../../+shared/shared.module';
import {ListComponent} from './list.component';
import {ListRoutingModule} from './list-routing.module';


@NgModule({
  imports: [
    ProtectedSharedModule,
    ListRoutingModule,
  ],
  declarations: [
    ListComponent
  ]
})
export class ListModule {
}
