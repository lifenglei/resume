const ConcatSource = require('webpack-sources').ConcatSource

// Custom plugin to inject CommonJS globals at the very beginning of the bundle
class CommonJSInjectorPlugin {
  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((file) => {
            if (file.endsWith('.js')) {
              const injection = `
// CommonJS Global Polyfills - Injected by CommonJSInjectorPlugin
(function() {
  if (typeof global === 'undefined') { window.global = window; }
  if (typeof exports === 'undefined') { window.exports = {}; }
  if (typeof module === 'undefined') {
    window.module = { exports: window.exports, require: function() { return {}; } };
  }
  if (typeof require === 'undefined') { window.require = function() { return {}; }; }
})();

`
              compilation.assets[file] = new ConcatSource(
                injection,
                compilation.assets[file]
              )
            }
          })
        })
        callback()
      })
    })
  }
}

module.exports = CommonJSInjectorPlugin