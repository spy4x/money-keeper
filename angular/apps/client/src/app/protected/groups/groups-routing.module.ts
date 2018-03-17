import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {GroupsComponent} from './groups.component';


const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      {
        path: '',
        redirectTo: 'add',
        pathMatch: 'full'
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: ':id',
        component: EditComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
