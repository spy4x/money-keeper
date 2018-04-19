import { NgModule } from '@angular/core';
import { ProtectedSharedModule } from '../+shared/shared.module';
import { EditComponent } from './edit/edit.component';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';

@NgModule({
  imports: [ProtectedSharedModule, TagsRoutingModule],
  declarations: [TagsComponent, EditComponent],
})
export class TagsModule {}
