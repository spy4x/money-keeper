import { NgModule } from '@angular/core';
import { ProtectedSharedModule } from '../+shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SpendingsByPersonComponent } from './widgets/spendings-by-person/spendings-by-person.component';
import { SpendingsToLimitComponent } from './widgets/spendings-to-limit/spendings-to-limit.component';

@NgModule({
  imports: [ProtectedSharedModule, HomeRoutingModule],
  declarations: [
    HomeComponent,
    SpendingsByPersonComponent,
    SpendingsToLimitComponent,
  ],
})
export class HomeModule {}
