import {NgModule} from '@angular/core';
import {ProtectedSharedModule} from '../+shared/shared.module';
import {SharedModule} from '../../+shared/shared.module';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {GroupsComponent} from './groups.component';


@NgModule({
  imports: [
    GroupsRoutingModule,
    SharedModule,
    ProtectedSharedModule
  ],
  declarations: [GroupsComponent, AddComponent, EditComponent]
})
export class GroupsModule {
}
