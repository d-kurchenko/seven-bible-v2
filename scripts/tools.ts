import consola from 'consola';
import shell, { ShellString } from 'shelljs';
import path from 'node:path';
import { ChildProcess } from 'node:child_process';

export const PackagePaths = {
  apiPath: path.resolve(__dirname, '../api'),
  uiPath: path.resolve(__dirname, '../ui'),
};

export const combineCommands = (commands: string[]) => commands.join(' && ');

export const hasShellError = (shellString: ShellString) =>
  shellString.code !== 0;

export const assertShellString = (
  shellString: ShellString,
  errorMessageOrCallback: string | ((shellString: ShellString) => void),
) => {
  if (hasShellError(shellString)) {
    if (typeof errorMessageOrCallback === 'string') {
      consola.error(errorMessageOrCallback);
    } else if (typeof errorMessageOrCallback === 'function') {
      errorMessageOrCallback(shellString);
    }
    shell.exit(1);
  }
};

interface ExecSyncReturnType {
  code: number;
  stdout: string;
  stderr: string;
  childProcess: ChildProcess;
}
export const execAsync = (command: string, options?: shell.ExecOptions) => {
  return new Promise<ExecSyncReturnType>((resolve) => {
    const childProcess = shell.exec(command, {
      ...options,
      async: true,
    }, (code, stdout, stderr) => {
      resolve({
        code,
        stdout,
        stderr,
        childProcess,
      });
    });
  });
};
