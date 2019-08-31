export interface GitResponseInterface {
  cloned?: boolean;
  location?: string;
  invalidURL?: string;
  url: string;
  originalURL?: string;
  urlType?: string;
  projectName?: string;
}

export class GitResponse implements GitResponseInterface {
  cloned?: boolean;
  invalidURL?: string;
  location?: string;
  originalURL?: string;
  projectName?: string;
  url: string;
  urlType?: string;

  constructor(gitInterface: GitResponseInterface) {
    this.cloned = gitInterface.cloned;
    this.invalidURL = gitInterface.invalidURL;
    this.location = gitInterface.location;
    this.originalURL = gitInterface.originalURL;
    this.projectName = gitInterface.projectName;
    this.url = gitInterface.url;
    this.urlType = gitInterface.urlType;
  }

  getCleanProjectName(): string {
    return this.projectName.split('-').map((x: string) => {
      return x.charAt(0).toUpperCase() + x.substr(1).toLowerCase();
    }).join(' ');
  }
}
