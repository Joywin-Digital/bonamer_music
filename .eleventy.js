module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  eleventyConfig.addFilter("staffByIds", function (staffList, ids) {
    if (!Array.isArray(staffList) || !Array.isArray(ids)) return [];
    return staffList.filter((person) => ids.includes(person.id));
  });

  eleventyConfig.addFilter("servicesByInstructor", function (services, instructorId) {
    if (!Array.isArray(services) || !instructorId) return [];
    return services.filter((service) => Array.isArray(service.instructorIds) && service.instructorIds.includes(instructorId));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
