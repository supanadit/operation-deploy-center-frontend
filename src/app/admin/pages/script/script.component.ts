import { Component, OnInit } from '@angular/core';
import { ScriptResponse, ScriptResponseInterface } from '../../../model/script.response';
import { ScriptService } from '../../../services/script.service';
import { DefaultResponse } from '../../../model/default.response';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {
  defaultScript: ScriptResponse = new ScriptResponse({
    command: [],
    dependency: [],
    name: null,
  });
  listScript: ScriptResponse[] = [];
  isEditorCreate = false;
  currentEditScript: ScriptResponse = this.defaultScript;

  constructor(
    private scriptService: ScriptService,
  ) {
  }

  ngOnInit() {
    this.loadScript();
  }

  toggleEditorCreate(scriptResponseInterface: ScriptResponseInterface = null): boolean {
    this.isEditorCreate = !this.isEditorCreate;
    if (scriptResponseInterface != null) {
      this.currentEditScript = scriptResponseInterface;
    }
    if (!this.isEditorCreate) {
      this.currentEditScript = this.defaultScript;
    }
    return this.isEditorCreate;
  }

  loadScript() {
    this.scriptService.scriptList().subscribe((data: DefaultResponse<ScriptResponse[]>) => {
      this.listScript = data.data;
    });
  }

}
