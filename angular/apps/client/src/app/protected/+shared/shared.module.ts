import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SharedModule } from '../../+shared/shared.module';
import { HeaderComponent } from './header/header.component';

const declarations = [MenuComponent, AccountsComponent, HeaderComponent];

@NgModule({
  imports: [SharedModule],
  declarations,
  exports: [...declarations, SharedModule],
})
export class ProtectedSharedModule {}
