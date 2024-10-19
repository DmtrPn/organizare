module.exports = {
    name: 'dobro',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '((\\.|/)(test.ts|test.js|spec.js|spec.ts))$',
    testURL: 'http://localhost/',
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['ts', 'js'],
    testTimeout: 50000,
    moduleNameMapper: {
        '^@components/(.*)': '<rootDir>/dist/components/$1',
        '^@common/(.*)': '<rootDir>/dist/components/common/$1',
        '^@core/(.*)': '<rootDir>/dist/core/$1',
        '^@events/(.*)': '<rootDir>/dist/events/$1',
        '^@utils/(.*)': '<rootDir>/dist/core/utils/$1',
        '^@retreat/(.*)': '<rootDir>/dist/modules/retreat/$1',
        '^@project-types/(.*)': '<rootDir>/dist/types/$1',
    },
    setupFilesAfterEnv: ['@jest-decorated/core/globals'],
};
