import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerComponent } from './pages/server/server.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { ScriptComponent } from './pages/script/script.component';
import { DeployComponent } from './pages/deploy/deploy.component';


@NgModule({
  declarations: [AdminComponent, HomeComponent, ServerComponent, RepositoryComponent, ScriptComponent, DeployComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
