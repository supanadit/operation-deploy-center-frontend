import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ServerComponent } from './pages/server/server.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { CodeEditor, ScriptComponent } from './pages/script/script.component';
import { OperationComponent } from './pages/operation/operation.component';
import { ServerService } from '../services/server.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { RealtimeService } from '../services/realtime.service';
import { RepositoryService } from '../services/repository.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { OperationService } from '../services/operation.service';
import { ScriptService } from '../services/script.service';

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
    CodeEditor,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    NgSelectModule,
  ],
  exports: [
    NgSelectModule,
  ],
  providers: [
    HttpClient,
    ServerService,
    RealtimeService,
    RepositoryService,
    OperationService,
    ScriptService,
  ],
})

export class AdminModule {
}
