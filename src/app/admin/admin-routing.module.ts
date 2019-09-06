import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerComponent } from './pages/server/server.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { ScriptComponent } from './pages/script/script.component';
import { OperationComponent } from './pages/operation/operation.component';


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
      path: 'repository',
      component: RepositoryComponent,
      data: {
        activeState: 'repository',
      }
    },
    {
      path: 'script',
      component: ScriptComponent,
      data: {
        activeState: 'script',
      }
    },
    {
      path: 'operation',
      component: OperationComponent,
      data: {
        activeState: 'operation',
      }
    },
    {
      path: 'deploy',
      loadChildren: './pages/deploy/deploy.module#DeployModule'
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
