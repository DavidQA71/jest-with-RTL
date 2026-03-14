/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json"
      }
    ]
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleFileExtensions: ["ts", "tsx", "js"]
};