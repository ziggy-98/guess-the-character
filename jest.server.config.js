module.exports = {
    roots: ["<rootDir>/server"],
    displayName: "server",
    setupFilesAfterEnv: ["<rootDir>/jest-server-setup.js"],
    testMatch: ["<rootDir>/**/__tests__/*.jest.(ts|tsx)"],
    testPathIgnorePatterns: ["<rootDir>/test/"],
  };
  