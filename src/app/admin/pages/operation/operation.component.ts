import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GitResponse, GitResponseInterface } from '../../../model/git.response';
import { RealtimeService } from '../../../services/realtime.service';
import { RepositoryService } from '../../../services/repository.service';
import { DefaultResponse } from '../../../model/default.response';
import { OperationResponse } from '../../../model/operation.response';
import { SSHResponse } from '../../../model/ssh.response';
import { ServerService } from '../../../services/server.service';

declare var jQuery: any;

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
  listServer: SSHResponse[] = [];


  listOperation: OperationResponse[] = [];
  currentOperation: OperationResponse = null;
  selectedOperationIndex = 0;

  gitClone: GitResponseInterface = this.gitDefault;
  directoryTarget = '/';
  directoryCompress = '/';

  selectedSSHOperation: SSHResponse = null;
  selectedRepositoryOperation: SSHResponse = null;
  selectedOperationType: any = null;

  directoryListing = [];
  directoryListingProcess = false;
  directoryListingError = false;
  directoryListingErrorMessage = '';

  operationTypeList = [
    {
      name: 'Standard Deploy',
      value: 1
    },
    {
      name: 'Deploy with Custom Script',
      value: 2,
    }
  ];

  constructor(
    private realtimeService: RealtimeService,
    private repositoryService: RepositoryService,
    private serverService: ServerService,
  ) {
  }

  ngOnInit() {
    this.realtimeService.getOperation().subscribe((data: OperationResponse[]) => {
      this.loadGit();
      this.loadSSH();
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

  loadSSH() {
    this.serverService.sshList().subscribe((response: DefaultResponse<SSHResponse[]>) => {
      if (response.isSuccess()) {
        this.listServer = response.data;
      }
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

  update() {
    if (this.gitClone.url != null && this.gitClone.url !== '') {
      this.repositoryService.gitUpdate(this.gitClone).subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

  sshDirectoryCheck() {
    if (this.selectedSSHOperation != null) {
      this.directoryListingProcess = true;
      // tslint:disable-next-line:max-line-length
      this.serverService.sshCheckDirectory(this.selectedSSHOperation, this.directoryTarget).subscribe((data: DefaultResponse<Array<string>>) => {
        if (!data.success) {
          this.directoryListingError = true;
          this.directoryListingErrorMessage = data.message;
        } else {
          this.directoryListingError = false;
          this.directoryListingErrorMessage = '';
        }
        this.directoryListingProcess = false;
        this.directoryListing = data.data;
      }, error => {
        this.directoryListing = [];
        this.directoryListingProcess = false;
        this.directoryListingError = true;
      });
    }
  }

  serverChange() {
    console.log('Changed');
  }


  ngOnDestroy(): void {
    // this.realtimeService.de
  }
}
