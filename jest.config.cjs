module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};
