import { NgModule } from '@angular/core';
import { ProtectedSharedModule } from '../+shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SpendingsByPersonComponent } from './widgets/spendings-by-person/spendings-by-person.component';

@NgModule({
  imports: [ProtectedSharedModule, HomeRoutingModule],
  declarations: [HomeComponent, SpendingsByPersonComponent],
})
export class HomeModule {}
