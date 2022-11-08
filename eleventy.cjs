const litPlugin = require('@lit-labs/eleventy-plugin-lit');
const CleanCSS = require('clean-css');
const fsSync = require('fs');
const htmlMinifier = require('html-minifier');

// dev mode build
const DEV = process.env.NODE_ENV === 'DEV';
// where the JS files are outputted
const jsFolder = DEV ? 'lib' : 'build';
// where to output 11ty output
const outputFolder = DEV ? '_dev' : '_prod';

module.exports = function (eleventyConfig) {
  // copy folders to the 11ty output folder
  eleventyConfig
    .addPassthroughCopy({ [`${jsFolder}/`]: 'js/' })
    .addPassthroughCopy('site/css')
    .addPassthroughCopy('site/fonts')
    .addPassthroughCopy('site/images');

  // add the lit-ssr plugin
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: [`./${jsFolder}/ssr.js`],
  });

  // add this for 11ty's --watch flag. We don't use it in this example
  eleventyConfig.addWatchTarget(`./${jsFolder}/**/*.js`);

  /**
   * Bundle, minify, and inline a CSS file. Path is relative to ./site/css/.
   *
   * In dev mode, instead import the CSS file directly.
   */
  eleventyConfig.addShortcode('inlinecss', (path) => {
    if (DEV) {
      return `<link rel="stylesheet" href="/css/${path}">`;
    }
    const result = new CleanCSS({ inline: ['local'] }).minify([
      `./site/css/${path}`,
    ]);
    if (result.errors.length > 0 || result.warnings.length > 0) {
      throw new Error(
        `CleanCSS errors/warnings on file ${path}:\n\n${[
          ...result.errors,
          ...result.warnings,
        ].join('\n')}`
      );
    }
    return `<style>${result.styles}</style>`;
  });

  /**
   * Inline the Rollup-bundled version of a JavaScript module. Path is relative
   * to ./lib or ./build.
   *
   * In dev mode, instead directly import the module, which has already been
   * symlinked directly to the TypeScript output directory.
   */
  eleventyConfig.addShortcode('inlinejs', (path) => {
    if (DEV) {
      return `<script type="module" src="/js/${path}"></script>`;
    }
    const script = fsSync.readFileSync(`${jsFolder}/${path}`, 'utf8').trim();
    return `<script type="module">${script}</script>`;
  });

  // minify the html in Prod mode
  eleventyConfig.addTransform('htmlMinify', function (content, outputPath) {
    if (DEV || !outputPath.endsWith('.html')) {
      return content;
    }
    const minified = htmlMinifier.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
    return minified;
  });

  // set output folders and use nunjucks for html templating engine. see
  // nunjucks docs and 11ty docs for more info on nunjucks templating
  return {
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'site',
      output: outputFolder,
    },
  };
};
