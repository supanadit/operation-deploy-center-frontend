import { ScriptResponseInterface } from './script.response';

export interface DeployResponseInterface {
  ssh: {
    host: string;
  };
  git: {
    url: string;
  };
  target: string;
  targetCompress: string;
  scriptLocal?: ScriptResponseInterface;
  scriptRemote?: ScriptResponseInterface;
}

export class DeployResponse implements DeployResponseInterface {
  git: { url: string };
  ssh: { host: string };
  target: string;
  targetCompress: string;
  scriptLocal?: ScriptResponseInterface;
  scriptRemote?: ScriptResponseInterface;

  constructor(deployResponse: DeployResponseInterface) {
    this.git = deployResponse.git;
    this.ssh = deployResponse.ssh;
    this.target = deployResponse.target;
    this.targetCompress = deployResponse.targetCompress;
    this.scriptLocal = deployResponse.scriptLocal;
    this.scriptRemote = deployResponse.scriptRemote;
  }
}
