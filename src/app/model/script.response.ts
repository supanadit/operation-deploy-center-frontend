export interface ScriptResponseInterface {
  name: string;
  dependency?: Array<string>;
  command: Array<CommandInterface>;
}

export interface CommandInterface {
  command: string;
  description?: string;
  directory?: Array<string>;
}

export class ScriptResponse implements ScriptResponseInterface {
  name: string;
  dependency?: Array<string>;
  command: Array<CommandInterface>;

  constructor(script: ScriptResponseInterface) {
    this.command = script.command;
    this.dependency = script.dependency;
    this.name = script.name;
  }
}
