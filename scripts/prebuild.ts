import shell from 'shelljs';
import { assertShellString, PackagePaths } from './tools';
import consola from 'consola';

consola.start('Monorepo checking started');
let shellString = shell.exec('yarn lint');
assertShellString(shellString, 'Monorepo lint failed');
consola.info('Monorepo checking ended\n');

consola.start('Backend checking started');
shellString = shell.exec('yarn run full-check', {
  cwd: PackagePaths.backendPath,
});
assertShellString(shellString, 'Backend checking failed');
consola.info('Backend checking ended\n');

consola.start('Frontend checking started');
shellString = shell.exec('yarn run full-check', {
  cwd: PackagePaths.frontendPath,
});
assertShellString(shellString, 'Frontend checking failed');
consola.info('Frontend checking ended\n');

consola.success('Success checking');
