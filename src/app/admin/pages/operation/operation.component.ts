import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitResponse, GitResponseInterface } from '../../../model/git.response';
import { RealtimeService } from '../../../services/realtime.service';
import { RepositoryService } from '../../../services/repository.service';
import { DefaultResponse } from '../../../model/default.response';
import { OperationResponse } from '../../../model/operation.response';
import { SSHResponse } from '../../../model/ssh.response';
import { ServerService } from '../../../services/server.service';
import { interval, Subscription } from 'rxjs';
import { OperationService } from '../../../services/operation.service';
import { DeployResponse, DeployResponseInterface } from '../../../model/deploy.response';
import { DeployService } from '../../../services/deploy.service';
import { ScriptService } from '../../../services/script.service';
import { ScriptResponse } from '../../../model/script.response';

declare var jQuery: any;

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  gitDefault: GitResponseInterface = {
    url: null,
  };
  listRepository: GitResponse[] = [];
  listServer: SSHResponse[] = [];
  listHistory: DeployResponse[] = [];

  selectedHistory: DeployResponse = null;

  listOperation: OperationResponse[] = [];
  currentOperation: OperationResponse = null;
  selectedOperationIndex = 0;

  gitClone: GitResponseInterface = this.gitDefault;
  directoryTarget = '/';
  directoryCompress = '/';

  selectedSSHOperation: SSHResponse = null;
  selectedRepositoryOperation: GitResponse = null;
  selectedOperationType: any = null;

  directoryCompressListing = [];
  directoryCompressListingProcess = false;
  directoryCompressListingError = false;
  directoryCompressListingErrorMessage = '';
  directoryCompressListingFocus = false;

  directoryListing = [];
  directoryListingProcess = false;
  directoryListingError = false;
  directoryListingErrorMessage = '';
  directoryListingFocus = false;

  listScript: ScriptResponse[] = [];
  localScript: ScriptResponse = null;
  remoteScript: ScriptResponse = null;

  operationTypeList = [
    {
      name: 'Standard Deploy',
      value: 1
    },
    {
      name: 'Custom Deploy',
      value: 2,
    },
    {
      name: 'From History',
      value: 3,
    }
  ];

  constructor(
    private realtimeService: RealtimeService,
    private repositoryService: RepositoryService,
    private serverService: ServerService,
    private operationService: OperationService,
    private deployService: DeployService,
    private scriptService: ScriptService,
  ) {
  }

  ngOnInit() {
    this.realtimeService.getOperation().subscribe((data: OperationResponse[]) => {
      this.loadGit();
      this.loadSSH();
      this.loadScript();
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
    const source = interval(3500);
    this.subscription = source.subscribe(val => {
      if (!this.directoryCompressListingFocus) {
        this.clearDirectoryCompress();
      }
      if (!this.directoryListingFocus) {
        this.clearDirectoryListing();
      }
    });
    this.deployService.historyList().subscribe((data) => {
      this.listHistory = data.data;
    });
  }

  clearDirectoryListing() {
    this.directoryListing = [];
    this.directoryListingProcess = false;
    this.directoryListingError = false;
    this.directoryListingErrorMessage = '';
  }

  clearDirectoryCompress() {
    this.directoryCompressListing = [];
    this.directoryCompressListingProcess = false;
    this.directoryCompressListingError = false;
    this.directoryCompressListingErrorMessage = '';
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

  loadScript() {
    this.scriptService.scriptList().subscribe((data: DefaultResponse<ScriptResponse[]>) => {
      this.listScript = data.data;
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

  gitDirectoryCheck() {
    if (this.selectedRepositoryOperation != null) {
      this.directoryCompressListingProcess = true;
      // tslint:disable-next-line:max-line-length
      this.repositoryService.gitCheckDirectory(this.selectedRepositoryOperation, this.directoryCompress).subscribe((data: DefaultResponse<Array<string>>) => {
        if (!data.success) {
          this.directoryCompressListingError = true;
          this.directoryCompressListingErrorMessage = data.message;
        } else {
          this.directoryCompressListingError = false;
          this.directoryCompressListingErrorMessage = '';
        }
        this.directoryCompressListingProcess = false;
        this.directoryCompressListing = data.data;
      }, error => {
        this.directoryCompressListing = [];
        this.directoryCompressListingProcess = false;
        this.directoryCompressListingError = true;
      });
    }
  }

  serverChange() {
    console.log('Changed');
  }

  startDeploy() {
    const deployResponse: DeployResponseInterface = {
      ssh: {
        host: this.selectedSSHOperation.host,
      },
      git: {
        url: this.selectedRepositoryOperation.url,
      },
      target: this.directoryTarget,
      targetCompress: this.directoryCompress,
      scriptRemote: this.remoteScript,
      scriptLocal: this.localScript,
    };
    if (this.selectedOperationType !== 3) {
      // tslint:disable-next-line:max-line-length
      if (this.selectedOperationType === 1) {
        this.operationService.standardDeploy(deployResponse).subscribe((data: any) => {
          console.log('Success', data);
        }, error => {
          console.log('Error', error);
        });
      } else {
        this.operationService.scriptDeploy(deployResponse).subscribe((data: any) => {
          console.log('Success', data);
        }, error => {
          console.log('Error', error);
        });
      }
    }
    if (this.selectedOperationType !== 1 && this.selectedOperationType !== 2) {
      this.operationService.fromHistory(deployResponse).subscribe((data: any) => {
        console.log('Success', data);
      }, error => {
        console.log('Error', error);
      });
    }
  }

  changeOperation() {
    if (this.selectedOperationType !== 3) {
      this.selectedHistory = null;
    }
    if (this.selectedOperationType !== 1 && this.selectedOperationType !== 2) {
      this.selectedSSHOperation = null;
      this.selectedRepositoryOperation = null;
      this.directoryTarget = '/';
      this.directoryCompress = '/';
    }
  }

  confirmation() {
    jQuery('#confirmation').modal({
      backdrop: 'static',
      show: true
    });
    jQuery('#add').modal('hide');
  }

  cancel() {
    jQuery('#add').modal('show');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
