/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    },
    "transformIgnorePatterns": [
        "node_modules/(?!variables/.*)"
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
    // ... rest of your config
};

export default config;