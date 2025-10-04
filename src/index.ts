import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface GitOptions {
  binary: string;
  maxBuffer: number;
}

interface Git {
  customBinary(gitPath: string): Git;
  init(bare: boolean, handlerFn: (err: Error | null, data: any) => void): Git;
  clone(repoPath: string, localPath: string, handlerFn: (err: Error | null, data: any) => void): Git;
  addConfig(key: string, value: string, handlerFn: (err: Error | null, data: any) => void): Git;
  // ... other methods
}

class SimpleGit {
  private git: string;
  private workingDir: string;
  private maxBuffer: number;
  private silent: boolean;

  constructor(workingDir: string = '.', options: GitOptions = { binary: 'git', maxBuffer: 100 * 1024 }) {
    this.workingDir = workingDir;
    this.git = options.binary;
    this.maxBuffer = options.maxBuffer;
    this.silent = process.env.NODE_ENV === 'production';
  }

  customBinary(gitPath: string): SimpleGit {
    this.git = gitPath;
    return this;
  }

  init(bare: boolean, handlerFn: (err: Error | null, data: any) => void): SimpleGit {
    const args = bare ? ['init', '--bare'] : ['init'];
    this.exec(args, handlerFn);
    return this;
  }

  clone(repoPath: string, localPath: string, handlerFn: (err: Error | null, data: any) => void): SimpleGit {
    const args = ['clone', repoPath, localPath];
    this.exec(args, handlerFn);
    return this;
  }

  addConfig(key: string, value: string, handlerFn: (err: Error | null, data: any) => void): SimpleGit {
    const args = ['config', key, value];
    this.exec(args, handlerFn);
    return this;
  }

  // ... other methods

  private exec(args: string[], handlerFn: (err: Error | null, data: any) => void) {
    const cmd = `${this.git} ${args.join(' ')}`;
    childProcess.exec(cmd, { cwd: this.workingDir, maxBuffer: this.maxBuffer }, (err, stdout, stderr) => {
      if (err) {
        handlerFn(err, null);
      } else {
        handlerFn(null, stdout);
      }
    });
  }
}

export default SimpleGit;