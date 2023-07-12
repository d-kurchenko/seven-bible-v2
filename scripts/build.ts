import shell from 'shelljs';
import { PackagePaths, execAsync } from './tools';
import path from 'path';
import fs from 'fs-extra';

const build = async () => {
  const distFolderName = 'temp';

  shell.cd(PackagePaths.backendPath);
  shell.mkdir(distFolderName);

  await Promise.all([
    execAsync(`yarn build`),
    execAsync(`yarn --prod --modules-folder ${distFolderName}/node_modules`),
  ]);
  shell.cp('-R', 'dist/', distFolderName);
  shell.cp('-R', '.env', distFolderName);
  shell.exec(`npx quasar clean`, {
    cwd: PackagePaths.frontendPath,
  });
  fs.ensureDirSync(path.join(PackagePaths.frontendPath, 'dist'));
  shell.mv(distFolderName, path.join(PackagePaths.frontendPath, 'dist/server'));

  shell.cd(PackagePaths.frontendPath);
  await Promise.all([
    execAsync(`yarn build:spa`),
    execAsync(`yarn build:electron`),
  ]);
};

build();
