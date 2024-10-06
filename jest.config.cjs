module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
