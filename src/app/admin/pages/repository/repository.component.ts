import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../../../services/realtime.service';
import { GitResponse } from '../../../model/git.response';
import { RepositoryService } from '../../../services/repository.service';
import { DefaultResponse } from '../../../model/default.response';
import { OperationResponse } from '../../../model/operation.response';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  defaultGit: GitResponse = new GitResponse({
    url: null,
  });
  listRepository: GitResponse[] = [];
  isEditorCreate = false;
  currentEditGit: GitResponse = this.defaultGit;

  constructor(
    private realtimeService: RealtimeService,
    private repositoryService: RepositoryService,
  ) {
  }

  ngOnInit() {
    this.loadGit();
    this.realtimeService.getOperation().subscribe((data: OperationResponse[]) => {
      this.loadGit();
    });
  }

  toggleEditorCreate(gitResponseInterface: GitResponse = null): boolean {
    this.isEditorCreate = !this.isEditorCreate;
    if (gitResponseInterface != null) {
      this.currentEditGit = gitResponseInterface;
    }
    if (!this.isEditorCreate) {
      this.currentEditGit = this.defaultGit;
    }
    return this.isEditorCreate;
  }

  gitSave(git: GitResponse) {
    if (git.url != null && git.url !== '') {
      this.repositoryService.gitSave(git).subscribe((data: DefaultResponse<any>) => {
        this.loadGit();
        this.toggleEditorCreate();
      }, error => {
        console.info('ERROR', error);
      });
    }
  }

  loadGit() {
    this.repositoryService.gitList().subscribe((data: DefaultResponse<GitResponse[]>) => {
      this.listRepository = data.data;
    });
  }

}
