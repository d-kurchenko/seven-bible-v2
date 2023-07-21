import shell from 'shelljs';
import { PackagePaths } from './tools';

const isElectron = process.argv.includes('--electron');

const apiProcess = shell.exec(`yarn start:dev`, {
  async: true,
  cwd: PackagePaths.apiPath,
});
apiProcess.once('close', () => shell.exit());

const command = isElectron ? 'yarn dev:electron' : 'yarn dev:spa';
const uiProcess = shell.exec(command, {
  async: true,
  cwd: PackagePaths.uiPath,
});
uiProcess.once('close', () => shell.exit());
