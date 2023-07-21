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

  const extraResourcesDir = 'extra-resources';
  fs.ensureDirSync(path.join(PackagePaths.frontendPath, extraResourcesDir));
  shell.mv(distFolderName, path.join(PackagePaths.frontendPath, `${extraResourcesDir}/server`));

  shell.cd(PackagePaths.frontendPath);
  await Promise.all([
    execAsync(`yarn build`),
  ]);
  shell.rm('-rf', extraResourcesDir);
};

build();
