import { NgModule } from '@angular/core';
import { ProtectedSharedModule } from '../+shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [ProtectedSharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
