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
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { RealtimeService } from '../services/realtime.service';
import { RepositoryService } from '../services/repository.service';

const config: SocketIoConfig = {
  url: environment.api_engine, options: {
    cors: '*:*',
  }
};

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
    SocketIoModule.forRoot(config)
  ],
  providers: [
    HttpClient,
    ServerService,
    RealtimeService,
    RepositoryService,
  ]
})
export class AdminModule {
}
