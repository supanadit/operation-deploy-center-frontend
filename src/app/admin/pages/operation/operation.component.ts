import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitResponse, GitResponseInterface } from '../../../model/git.response';
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
  gitDefault: GitResponseInterface = {
    url: null,
  };
  listRepository: GitResponse[] = [];
  listOperation: OperationResponse[] = [];
  currentOperation: OperationResponse = null;
  selectedOperationIndex = 0;
  gitClone: GitResponseInterface = this.gitDefault;

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
    }, error => {
      this.listOperation = [];
      this.currentOperation = null;
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

  clearOperation() {
    this.realtimeService.clearOperation();
  }

  clone() {
    if (this.gitClone.url != null && this.gitClone.url !== '') {
      this.repositoryService.gitClone(this.gitClone).subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

  delete() {
    if (this.gitClone.url != null && this.gitClone.url !== '') {
      this.repositoryService.gitRemove(this.gitClone).subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

  compress() {
    if (this.gitClone.url != null && this.gitClone.url !== '') {
      this.repositoryService.gitCompress(this.gitClone).subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

  ngOnDestroy(): void {
    // this.realtimeService.de
  }
}
