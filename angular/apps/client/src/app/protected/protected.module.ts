import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ProtectedRoutingModule} from './protected-routing.module';
import {ActiveGroupService} from './active-group.service';
import {ActiveUserService} from './active-user.service';


@NgModule({
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ],
  declarations: [],
  providers: [
    ActiveGroupService,
    ActiveUserService
  ]
})
export class ProtectedModule {
}
