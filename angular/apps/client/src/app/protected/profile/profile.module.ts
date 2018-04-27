import { NgModule } from '@angular/core';
import { SharedModule } from '../../+shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProtectedSharedModule } from '../+shared/shared.module';

@NgModule({
  imports: [SharedModule, ProtectedSharedModule, ProfileRoutingModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
