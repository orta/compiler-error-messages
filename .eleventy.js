// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type {import("@11ty/eleventy/src/Config") } */
module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["css", "md", "njk", "md"]);

  // Grabs a html file
  eleventyConfig.addShortcode("example", function (path) {
      return readFileSync(join(__dirname, "output", path + ".html"), "utf8")
   });
};
