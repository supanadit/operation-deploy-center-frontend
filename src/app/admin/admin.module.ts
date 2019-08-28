import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerComponent } from './pages/server/server.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { ScriptComponent } from './pages/script/script.component';
import { OperationComponent } from './pages/operation/operation.component';
import { ServerService } from '../services/server.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    ServerComponent,
    RepositoryComponent,
    ScriptComponent,
    OperationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ],
  providers: [
    HttpClient,
    ServerService,
  ]
})
export class AdminModule {
}
