import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitResponse } from '../../../model/git.response';
import { RealtimeService } from '../../../services/realtime.service';
import { RepositoryService } from '../../../services/repository.service';
import { DefaultResponse } from '../../../model/default.response';
import { OperationResponse } from '../../../model/operation.response';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit, OnDestroy {
  listRepository: GitResponse[] = [];
  listOperation: OperationResponse[] = [];
  currentOperation: OperationResponse = null;
  selectedOperationIndex = 0;

  constructor(
    private realtimeService: RealtimeService,
    private repositoryService: RepositoryService,
  ) {
  }

  ngOnInit() {
    this.loadGit();
    this.realtimeService.getOperation().subscribe((data: OperationResponse[]) => {
      this.listOperation = [];
      this.listOperation = data;
      if (this.listOperation.length !== 0) {
        this.currentOperation = this.listOperation[this.selectedOperationIndex];
      } else {
        if (this.listOperation.length === 0) {
          this.currentOperation = null;
        }
      }
    });
  }

  loadGit() {
    this.repositoryService.gitList().subscribe((data: DefaultResponse<GitResponse[]>) => {
      this.listRepository = data.data;
    });
  }

  selectOperation(operation: OperationResponse, index: number) {
    this.selectedOperationIndex = index;
    this.currentOperation = operation;
  }

  ngOnDestroy(): void {
    // this.realtimeService.de
  }
}
