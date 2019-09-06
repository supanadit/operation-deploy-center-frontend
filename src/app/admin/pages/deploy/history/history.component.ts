import { Component, OnInit } from '@angular/core';
import { DeployService } from '../../../../services/deploy.service';
import { DeployResponse } from '../../../../model/deploy.response';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  listHistory: DeployResponse[] = [];

  constructor(
    private deployService: DeployService,
  ) {
  }

  ngOnInit() {
    this.deployService.historyList().subscribe((data) => {
      this.listHistory = data.data;
    });
  }

}
