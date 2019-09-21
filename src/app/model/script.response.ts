export interface ScriptResponseInterface {
  name: string;
  dependency?: Array<string>;
  command: Array<CommandInterface>;
  description: string;
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
  description: string;

  constructor(script: ScriptResponseInterface) {
    this.command = script.command;
    this.dependency = script.dependency;
    this.name = script.name;
    this.description = script.description;
  }
}
