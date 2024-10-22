/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    "transformIgnorePatterns": [
        "node_modules/(?!variables/.*)"
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
    // ... rest of your config
};

export default config;