import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeployRoutingModule } from './deploy-routing.module';
import { DeployComponent } from './deploy.component';
import { HistoryComponent } from './history/history.component';
import { DeployService } from '../../../services/deploy.service';


@NgModule({
  declarations: [DeployComponent, HistoryComponent],
  imports: [
    CommonModule,
    DeployRoutingModule
  ],
  providers: [
    DeployService,
  ],
})
export class DeployModule {
}
