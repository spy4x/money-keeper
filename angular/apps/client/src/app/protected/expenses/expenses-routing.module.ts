import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from './editor/editor.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './list/list.module#ListModule'
      },
      {
        path: 'create',
        component: EditorComponent
      },
      {
        path: 'create/:categoryId',
        component: EditorComponent
      },
      {
        path: ':expenseId',
        component: EditorComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule {
}
