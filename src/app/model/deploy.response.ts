export interface DeployResponseInterface {
  ssh: {
    host: string;
  };
  git: {
    url: string;
  };
  target: string;
  targetCompress: string;
}

export class DeployResponse implements DeployResponseInterface {
  git: { url: string };
  ssh: { host: string };
  target: string;
  targetCompress: string;

  constructor(deployResponse: DeployResponseInterface) {
    this.git = deployResponse.git;
    this.ssh = deployResponse.ssh;
    this.target = deployResponse.target;
    this.targetCompress = deployResponse.targetCompress;
  }
}
