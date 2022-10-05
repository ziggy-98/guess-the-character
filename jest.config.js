module.exports = {
    projects: [
      {
        roots: ["<rootDir>/client"],
        displayName: "client",
        setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
        testMatch: ["<rootDir>/**/__tests__/*.jest.(ts|tsx)"],
        testPathIgnorePatterns: ["<rootDir>/test/"],
        moduleNameMapper: {
          "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
        },
        coverageThreshold: {
          global: {
            branches: 85,
            functions: 83,
            lines: 93,
            statements: 92,
          },
        },
      },
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