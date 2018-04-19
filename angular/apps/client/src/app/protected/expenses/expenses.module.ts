import { NgModule } from '@angular/core';
import { ProtectedSharedModule } from '../+shared/shared.module';
import { EditorComponent } from './editor/editor.component';
import { ExpensesRoutingModule } from './expenses-routing.module';

@NgModule({
  imports: [ProtectedSharedModule, ExpensesRoutingModule],
  declarations: [EditorComponent],
})
export class ExpensesModule {}
