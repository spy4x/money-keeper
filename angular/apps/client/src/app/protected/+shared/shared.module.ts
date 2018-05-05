import { NgModule } from '@angular/core';
import { SharedModule } from '../../+shared/shared.module';
import { AccountsComponent } from './accounts/accounts.component';
import { GroupSelectorComponent } from './group-selector/group-selector.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

const declarations = [
  MenuComponent,
  AccountsComponent,
  HeaderComponent,
  GroupSelectorComponent,
];

@NgModule({
  imports: [SharedModule],
  declarations,
  exports: [...declarations, SharedModule],
})
export class ProtectedSharedModule {}
