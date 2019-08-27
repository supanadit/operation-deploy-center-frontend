import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerComponent } from './pages/server/server.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { ScriptComponent } from './pages/script/script.component';
import { DeployComponent } from './pages/deploy/deploy.component';


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
      path: 'deploy',
      component: DeployComponent,
      data: {
        activeState: 'deploy',
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
