import shell from 'shelljs';
import { assertShellString, PackagePaths } from './tools';
import consola from 'consola';

consola.start('Monorepo checking started');
let shellString = shell.exec('yarn lint');
assertShellString(shellString, 'Monorepo lint failed');
consola.info('Monorepo checking ended\n');

consola.start('API checking started');
shellString = shell.exec('yarn run full-check', {
  cwd: PackagePaths.apiPath,
});
assertShellString(shellString, 'API checking failed');
consola.info('API checking ended\n');

consola.start('UI checking started');
shellString = shell.exec('yarn run full-check', {
  cwd: PackagePaths.uiPath,
});
assertShellString(shellString, 'UI checking failed');
consola.info('UI checking ended\n');

consola.success('Success checking');
