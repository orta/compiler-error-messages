// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

module.exports = function (eleventyConfig) {

  eleventyConfig.setTemplateFormats(["css"]);

  // Grabs a html file
  eleventyConfig.addShortcode("example", function (path) {
      return readFileSync(join(__dirname, "output", path + ".html"), "utf8")
   });
};
