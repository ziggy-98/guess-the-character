module.exports = {
    projects: [
      {
        displayName: "server",
        roots: ["<rootDir>/server"],
        setupFilesAfterEnv: ["<rootDir>/jest-server-setup.js"],
        testMatch: ["<rootDir>/**/__tests__/*.jest.(ts|tsx)"],
        testPathIgnorePatterns: ["<rootDir>/test/"],
        preset: 'ts-jest',
        testEnvironment: 'node'
      },
    ],
  };