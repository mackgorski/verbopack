module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@next/next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
    env: {
        node: true,
        es6: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        },
        next: {
            rootDir: ['apps/*/'] // Update this to match your project structure
        }
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@next/next/no-html-link-for-pages': 'off' // Disable this rule if you're using app directory
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                '@typescript-eslint/no-var-requires': 'error'
            }
        }
    ],
    ignorePatterns: [
        "bindings/**",
        "tree-sitter/**",
        "grammar.js",
        "json-grammar.js",
        "typescript-grammar.js",
    ]
};
