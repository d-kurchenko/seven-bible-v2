import shell from 'shelljs';
import { PackagePaths } from './tools';

const isElectron = process.argv.includes('--electron');

const backendProcess = shell.exec(`yarn start:dev`, {
  async: true,
  cwd: PackagePaths.backendPath,
});
backendProcess.once('close', () => shell.exit());

const command = isElectron ? 'yarn dev:electron' : 'yarn dev:spa';
const frontendProcess = shell.exec(command, {
  async: true,
  cwd: PackagePaths.frontendPath,
});
frontendProcess.once('close', () => shell.exit());
