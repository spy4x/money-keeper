import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MenuComponent} from './menu/menu.component';
import {AccountsComponent} from './accounts/accounts.component';
import {SharedModule} from '../../+shared/shared.module';


const declarations = [
  MenuComponent,
  AccountsComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations,
  exports: [
    ...declarations
  ]
})
export class ProtectedSharedModule {
}
