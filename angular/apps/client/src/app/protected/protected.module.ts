import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ProtectedRoutingModule} from './protected-routing.module';
import {ProtectedStoreModule} from './+store/module';


@NgModule({
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ProtectedStoreModule
  ],
  declarations: [],
  providers: [
  ]
})
export class ProtectedModule {
}
