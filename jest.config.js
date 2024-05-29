module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      importHelpers: true
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>'],
  testMatch: [
    '**/tests/**/*.test.ts',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest'
  },
  testTimeout: 10000,
}
