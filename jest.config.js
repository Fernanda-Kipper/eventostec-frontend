module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/node_modules/jest-preset-angular/setup-jest.js'],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',  // Para transformar arquivos TypeScript e HTML
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  collectCoverage: true,
  coverageReporters: ['html', 'text', 'text-summary'],
};
