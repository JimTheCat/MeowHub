/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};