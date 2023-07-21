/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */

module.exports = {
  appId: 'com.seven-bible',
  productName: 'seven-bible',
  artifactName: '${name}-${version}.${ext}',
  directories: {
    output: 'dist/electron',
  },
  files: [
    '!**/.vscode/*',
    '!src*/*',
    '!dist/*',
    '!*config*.{js,ts,mjs,cjs,json,tsbuildinfo}',
    '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md,electron-builder.cjs,index.html}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.app.json}',
  ],
  asar: false,
  extraResources: [{
    from: './extra-resources/',
    to: '.',
    filter: ['**/*'],
  }],
  linux: {
    target: ['AppImage'],
    category: 'Education',
  },
};
