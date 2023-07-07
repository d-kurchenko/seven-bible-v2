import consola from 'consola';
import shell, { ShellString } from 'shelljs';
import path from 'node:path';

export const PackagePaths = {
  backendPath: path.resolve(__dirname, '../backend'),
  frontendPath: path.resolve(__dirname, '../frontend'),
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
