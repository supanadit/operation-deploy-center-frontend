import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerComponent } from './pages/server/server.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
      data: {
        activeState: 'home',
      }
    },
    {
      path: 'server',
      component: ServerComponent,
      data: {
        activeState: 'server',
      }
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
