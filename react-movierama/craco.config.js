const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/components/styles"),
      "@modals": path.resolve(__dirname, "src/components/modals"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@dtypes": path.resolve(__dirname, "src/types"),
    },
  },
};
