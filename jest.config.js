module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "/node_modules/(?!some-esm-module|another-esm-module).+\\.js$"
  ],
  globals: {
    'ts-jest': {
      useESM: true,
      diagnostics: false,
      isolatedModules: true
    }
  },
  maxWorkers: '50%',
  cache: true
};
