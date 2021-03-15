const path = require('path');
const CONTENT_BASE = 'src';
const TEMPLATES = 'buildtools/templates/local';
const projectRoot = path.resolve(__dirname, '../../../../'); // used in jollyapps to target correct folders
const root = path.resolve(__dirname, '../../../../');
const dist = path.join(projectRoot, 'dist/');
const htmlOutPath = path.join(projectRoot, 'dist/');
const src = path.join(root, CONTENT_BASE);
const libsDir = path.join(src, 'libs');
const nodeDir = path.join(root, 'node_modules');

const PATHS = {
  projectRoot,
  root,
  dist,
  nodeDir,
  src,
  libsDir,
  templateDir: path.join(root, TEMPLATES),
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
