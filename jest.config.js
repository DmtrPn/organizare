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
        '^@project-types/(.*)': '<rootDir>/dist/types/$1',
        '^@core/(.*)': '<rootDir>/dist/core/$1',
        '^@modules/(.*)': '<rootDir>/dist/modules/$1',
        '^@events/(.*)': '<rootDir>/dist/events/$1',
        '^@utils/(.*)': '<rootDir>/dist/core/utils/$1',
        '^@reminder/(.*)': '<rootDir>/dist/modules/reminder/$1',
        '^@users/(.*)': '<rootDir>/dist/modules/users/$1',
        '^@notification/(.*)': '<rootDir>/dist/modules/notification/$1',
        '^@bot/(.*)': '<rootDir>/dist/bot/$1',
    },
    setupFilesAfterEnv: ['@jest-decorated/core/globals'],
};
