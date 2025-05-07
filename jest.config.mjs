/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    coverageDirectory: 'coverage',

    coverageProvider: 'v8',

    watchPathIgnorePatterns: ['<rootDir>/.postgres-data'],

    collectCoverageFrom: ['src/**/*.js'],
}

export default config
