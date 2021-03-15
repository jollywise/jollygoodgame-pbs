const path = require('path');
const CONTENT_BASE = 'src';
const TEMPLATES = path.resolve(__dirname, '../../../templates/pbs');
const root = path.resolve('.');
const dist = path.join(root, 'deploy');
const htmlOutPath = path.join(root, 'deploy');
const src = path.join(root, CONTENT_BASE);
const libsDir = path.join(src, 'libs');
const nodeDir = path.join(root, 'node_modules');

const PATHS = {
  root,
  dist,
  nodeDir,
  src,
  libsDir,
  templateDir: TEMPLATES,
  fonts: 'css/fonts/[name].[ext]',
  images: 'images/[name].[ext]',
  entryFile: src + '/js/main.js',
  contentBase: CONTENT_BASE,
  htmlOutPath: htmlOutPath,
  htmlOutName: 'index.html',
  cssOut: 'css/',
  jsOut: 'js/',
};

module.exports = PATHS;
