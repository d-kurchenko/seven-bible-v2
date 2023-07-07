import shell from 'shelljs';
import { assertShellString, PackagePaths } from './tools';
import consola from 'consola';

consola.start('Monorepo lint started');
let shellString = shell.exec(
  'npx eslint --ext .js,.ts --ignore-path .gitignore --fix ./',
);
assertShellString(shellString, 'Monorepo lint failed');
consola.info('Monorepo lint ended');

consola.start('Backend lint started');
shellString = shell.exec('yarn run lint', {
  cwd: PackagePaths.backendPath,
});
assertShellString(shellString, 'Backend lint failed');
consola.info('Backend lint ended');

consola.start('Frontend lint started');
shellString = shell.exec('yarn run lint', {
  cwd: PackagePaths.frontendPath,
});
assertShellString(shellString, 'Frontend lint failed');
consola.info('Frontend lint ended');

consola.success('Success lint');
