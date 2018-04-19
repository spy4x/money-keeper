import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../protected/protected.module#ProtectedModule',
  },
  {
    path: 'public',
    loadChildren: '../public/public.module#PublicModule',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes /*, {preloadingStrategy: PreloadAllModules}*/),
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
