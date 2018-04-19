import { NgModule } from '@angular/core';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ProtectedSharedModule } from '../+shared/shared.module';
import { SharedModule } from '../../+shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    GroupsRoutingModule,
    SharedModule,
    ProtectedSharedModule,
    AngularFireStorageModule,
  ],
  declarations: [CreateComponent, EditComponent, ListComponent],
})
export class GroupsModule {}
