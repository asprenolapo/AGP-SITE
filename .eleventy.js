const esbuild = require("esbuild");
const glob = require("glob");
const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // =====================================================
  // ESBUILD — Bundles and minifies JS files before build
  // Mantiene il nome originale (camelCase) definito in src
  // =====================================================
  eleventyConfig.on(
    "eleventy.before",
    async () => {
      const entryPoints = glob.sync("src/js/pages/*.js");

      // Compiliamo i file direttamente in _site
      // Esbuild manterrà il camelCase se il file originale lo è
      await esbuild.build({
        entryPoints,
        bundle: true,
        outdir: "_site/js/pages",
        minify: true,
      });

      // NOTA: Ho rimosso il ciclo fs.renameSync che forzava il lowercase
    }
  );

  // =====================================================
  // ELEVENTY IMAGE — Responsive images
  // =====================================================
  eleventyConfig.addShortcode(
    "image",
    async function (src, alt) {
      let metadata = await Image(src, {
        widths: require("./src/_data/site.js").image_width,
        formats: ["webp", "jpeg"],
        outputDir: "./_site/assets/img/",
        urlPath: "/assets/img/",
      });

      let imageAttributes = {
        alt,
        sizes: "(max-width: 768px) 100vw, 50vw",
        loading: "lazy",
        decoding: "async",
      };

      return Image.generateHTML(metadata, imageAttributes);
    }
  );

  // =====================================================
  // PASSTHROUGH — Static files
  // =====================================================
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/php/!(configExample.php)");

  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap-icons/font/fonts": "css/fonts",
    "node_modules/frameworks/bootstrap/dist/js/bootstrap.bundle.min.js": "js/bootstrap.bundle.min.js",
  });
  
  eleventyConfig.addPassthroughCopy({ "src/_data/lang.json": "_data/lang.json" });
  // =====================================================
  // WATCH & DIRECTORY CONFIG
  // =====================================================
  eleventyConfig.addWatchTarget("./src/scss");

  return {
    dir: {
      input: "src",
      includes: "components",
      layouts: "layouts",
    },
  };
};