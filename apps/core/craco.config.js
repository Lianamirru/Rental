const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@packages/ui-kit": path.resolve(__dirname, "../../packages/ui-kit/src"),
    },
    configure: (webpackConfig, { paths }) => {
      // Add ui-kit/src to babel-loader
      const jsRule = webpackConfig.module.rules.find((rule) =>
        Array.isArray(rule.oneOf)
      );

      if (jsRule) {
        const babelLoader = jsRule.oneOf.find(
          (r) =>
            r.loader &&
            r.loader.includes("babel-loader") &&
            r.test &&
            r.test.toString().includes("tsx")
        );

        if (babelLoader) {
          if (!Array.isArray(babelLoader.include)) {
            babelLoader.include = [babelLoader.include];
          }

          babelLoader.include.push(
            path.resolve(__dirname, "../../packages/ui-kit/src")
          );
        }
      }

      // Remove ModuleScopePlugin to allow imports outside src/
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
      );

      return webpackConfig;
    },
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        "^@packages/ui-kit(.*)$": "<rootDir>/../../packages/ui-kit/src$1",
      };
      return jestConfig;
    },
  },
};
