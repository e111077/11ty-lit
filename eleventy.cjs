const litPlugin = require('@lit-labs/eleventy-plugin-lit');
const inlineCss = require('./eleventy-helpers/shortcodes/inline-css.cjs');
const inlineJS = require('./eleventy-helpers/shortcodes/inline-js.cjs');
const minifyHTML = require('./eleventy-helpers/transforms/minify-html.cjs');

// dev mode build
const DEV = process.env.NODE_ENV === 'DEV';
// where the JS files are outputted
const jsDir = DEV ? 'lib' : 'build';
// where to output 11ty output
const outputFolder = DEV ? '_dev' : '_prod';

module.exports = function (eleventyConfig) {
  // copy folders to the 11ty output folder
  eleventyConfig
    .addPassthroughCopy({ [`${jsDir}/`]: 'js/' })
    .addPassthroughCopy('site/css')
    .addPassthroughCopy('site/fonts')
    .addPassthroughCopy('site/images');

  // add the lit-ssr plugin
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: [`./${jsDir}/ssr.js`],
  });

  // add this for 11ty's --watch flag. We don't use it in this example
  eleventyConfig.addWatchTarget(`./${jsDir}/**/*.js`);

  // install shortcodes
  inlineCss(eleventyConfig, DEV);
  inlineJS(eleventyConfig, DEV, { jsDir });

  // install transforms
  minifyHTML(eleventyConfig, DEV);

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
