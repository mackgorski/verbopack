module.exports = {
    extends: ['turbo', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
    settings: {
        next: {
            rootDir: ['apps/*/', 'packages/*/'],
        },
    },
};