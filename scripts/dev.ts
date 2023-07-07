import shell from 'shelljs';
import { PackagePaths } from './tools';

const isElectron = process.argv.includes('--electron');

shell.exec(`yarn start:dev`, {
  async: true,
  cwd: PackagePaths.backendPath,
});

const command = isElectron ? 'npx quasar dev -m electron' : 'npx quasar dev';
shell.exec(command, {
  async: true,
  cwd: PackagePaths.frontendPath,
});
