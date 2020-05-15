module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/examples/"],
};
