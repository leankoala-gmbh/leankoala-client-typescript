module.exports = {
  preset: 'ts-jest',
  verbose: true,
  roots: ['<rootDir>'],
  testMatch: [
    '**/tests/**/*.test.ts',
  ],
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest"
  },
}
