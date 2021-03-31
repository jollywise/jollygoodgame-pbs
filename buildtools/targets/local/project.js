const PROJECT = {
  title: '',
  manifestName: 'webpackmanifest',
  vendorName: 'vendor',
  generateHTML: true,
  generateSourcemaps: true,
  isHashed: true,
  dropConsole: false,
  isVendorChunked: true,
  environmentVars: {
    debug: true,
    watch: true,
    shortcuts: true,
    env: '',
  },
  containerId: 'game-holder',
};

module.exports = PROJECT;
