const path = require('path');

module.exports = {
    '**/*.{js,jsx,ts,tsx}': (filenames) => {
        const cwd = process.cwd();
        const relativePaths = filenames.map((f) => path.relative(cwd, f));
        return [
            `eslint --fix ${relativePaths.join(' ')}`,
            `prettier --write ${relativePaths.join(' ')}`,
        ];
    },
    '**/*.{json,md}': (filenames) => {
        const cwd = process.cwd();
        const relativePaths = filenames.map((f) => path.relative(cwd, f));
        return `prettier --write ${relativePaths.join(' ')}`;
    },
};