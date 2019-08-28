export interface SSHResponseInterface {
  host: string;
  password: string;
  port: string;
  username: string;
}

export class SSHResponse implements SSHResponseInterface {
  host: string;
  password: string;
  port: string;
  username: string;

  constructor(ssh: SSHResponseInterface) {
    this.host = ssh.host;
    this.password = ssh.password;
    this.port = ssh.port;
    this.username = ssh.username;
  }

  private empty(data: string): boolean {
    let result = false;
    if (data === '') {
      result = true;
    }
    return result;
  }

  isEmpty(): boolean {
    let countEmpty = 0;
    if (this.empty(this.host)) {
      countEmpty += 1;
    }
    if (this.empty(this.password)) {
      countEmpty += 1;
    }
    if (this.empty(this.port)) {
      countEmpty += 1;
    }
    if (this.empty(this.username)) {
      countEmpty += 1;
    }
    return countEmpty >= 1;
  }

}
