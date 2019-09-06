import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeployComponent } from './deploy.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [{
  path: '',
  component: DeployComponent,
  children: [
    {
      path: 'history',
      component: HistoryComponent,
      data: {
        activeState: 'deploy-history',
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeployRoutingModule {
}
