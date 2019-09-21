import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { CommandInterface, ScriptResponse, ScriptResponseInterface } from '../../../model/script.response';
import { ScriptService } from '../../../services/script.service';
import { DefaultResponse } from '../../../model/default.response';

declare const CodeMirror: any;

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
    description: null,
  });
  listScript: ScriptResponse[] = [];
  isEditorCreate = false;
  currentEditScript: ScriptResponse = this.defaultScript;

  @ViewChild('code', {static: false})
  set code(x: ElementRef) {
    if (typeof x !== 'undefined') {
      if (typeof x.nativeElement !== 'undefined') {
        CodeMirror.fromTextArea(x.nativeElement, {
          lineNumbers: true
        });
      }
    }
  }

  constructor(
    private scriptService: ScriptService,
  ) {
  }

  ngOnInit() {
    this.loadScript();
  }

  toggleEditorCreate(scriptResponseInterface: ScriptResponseInterface = null): boolean {
    console.log(scriptResponseInterface);
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

@Pipe({name: 'CodeEditor'})
export class CodeEditor implements PipeTransform {
  transform(listCode: Array<CommandInterface>): string {
    let code = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listCode.length; i++) {
      code = code.concat(listCode[i].command).concat((listCode[i].description !== '') ? ' # '.concat(listCode[i].description) : '');
      if (i !== (listCode.length - 1)) {
        code = code.concat('\n');
      }
    }
    return code;
  }
}
