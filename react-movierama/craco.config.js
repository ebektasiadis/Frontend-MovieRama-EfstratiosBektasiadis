const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@modals": path.resolve(__dirname, "src/components/modals"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@dtypes": path.resolve(__dirname, "src/types"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
    },
  },
  jest: {
    configure(config) {
      config.transformIgnorePatterns = ["<rootDir>/node_modules/(?!axios)/"];
      return config;
    },
  },
};
