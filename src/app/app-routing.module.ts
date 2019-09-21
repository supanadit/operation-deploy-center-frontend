import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule'
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: '',
      redirectTo: 'admin',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
