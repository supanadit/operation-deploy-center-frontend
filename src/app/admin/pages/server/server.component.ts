import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../services/server.service';
import { SSHResponse } from '../../../model/ssh.response';
import { DefaultResponse } from '../../../model/default.response';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  defaultSSH: SSHResponse = new SSHResponse({
    host: '',
    password: '',
    username: '',
    port: '22',
  });
  sshList: SSHResponse[] = [];
  currentEditSSH: SSHResponse = this.defaultSSH;
  isEditorCreate = false;

  constructor(
    private serverService: ServerService,
  ) {
  }

  ngOnInit() {
    this.loadSSH();
  }

  toggleEditorCreate(sshResponse: SSHResponse = null): boolean {
    this.isEditorCreate = !this.isEditorCreate;
    if (sshResponse != null) {
      this.currentEditSSH = sshResponse;
    }
    if (!this.isEditorCreate) {
      this.currentEditSSH = this.defaultSSH;
    }
    return this.isEditorCreate;
  }

  loadSSH() {
    this.serverService.sshList().subscribe((response: DefaultResponse<SSHResponse[]>) => {
      if (response.isSuccess()) {
        this.sshList = response.data;
      }
    });
  }

  saveSSH(ssh: SSHResponse) {
    if (!ssh.isEmpty()) {
      this.serverService.sshSave(ssh).subscribe((data: DefaultResponse<any>) => {
        this.loadSSH();
        this.toggleEditorCreate();
      }, error => {
        console.info('ERROR', error);
      });
    }
  }

}
