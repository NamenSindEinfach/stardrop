const path = require("path");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const Image = require("@11ty/eleventy-img");
const { DateTime } = require("luxon");
const excerpts = require("excerpts");
require("dotenv").config();

const baseUrl = process.env.BASE_URL || "https://stardrop.pages.dev";
const globalSiteData = {
  title: "Stardrop",
  description: "A blog about Stardew Valley.",
  locale: "en_US",
  lang: "en-US",
  baseUrl: baseUrl,
};

module.exports = function (eleventyConfig) {
  /* --- GLOBAL DATA --- */

  eleventyConfig.addGlobalData("site", globalSiteData);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "---",
  });

  /* --- PASSTHROUGHS --- */

  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/images");

  /* --- PLUGINS --- */

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyVitePlugin, {});

  /* --- SHORTCODES --- */

  // Image shortcode config
  let defaultSizesConfig = "(min-width: 1200px) 1400px, 100vw"; // above 1200px use a 1400px image at least, below just use 100vw sized image

  eleventyConfig.addShortcode(
    "image",
    async function (src, alt, sizes = defaultSizesConfig) {
      console.log(`Generating image(s) from:  ${src}`);
      let metadata = await Image(src, {
        widths: [800, 1500],
        formats: ["webp", "jpeg"],
        urlPath: "/images/",
        outputDir: "./_site/images/",
        filenameFormat: function (_id, src, width, format, _options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          return `${name}-${width}w.${format}`;
        },
      });

      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      return Image.generateHTML(metadata, imageAttributes);
    },
  );

  // Output year for copyright notices
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Excerpt
  eleventyConfig.addShortcode("excerpt", function (article) {
    const content = article.templateContent;
    return excerpts(content, { words: 25 });
  });

  /* --- COLLECTIONS --- */

  eleventyConfig.addCollection("bibbles", function (collection) {
    return collection.getFilteredByGlob("./src/bibbles/*.njk").sort((a, b) => {
      if (a.data.order > b.data.order) return 1;
      else if (a.data.order < b.data.order) return -1;
      return 0;
    });
  });

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("./src/posts/*.njk").reverse();
  });

  /* --- FILTERS --- */

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "dd LLLL yyyy",
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Custom Random Helper Filter (useful for ID attributes)
  eleventyConfig.addFilter("generateRandomIdString", function (prefix) {
    return prefix + "-" + Math.floor(Math.random() * 1000000);
  });

  /* --- BASE CONFIG --- */

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "includes", // this path is releative to input-path (src/)
      layouts: "layouts", // this path is releative to input-path (src/)
      data: "data", // this path is releative to input-path (src/)
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
};
