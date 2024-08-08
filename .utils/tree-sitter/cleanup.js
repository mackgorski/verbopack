const fs = require('fs');
const path = require('path');

// Directories and files to delete
const pathsToDelete = [
    'bindings',
    'src',
    'binding.gyp',
    'setup.py',
    'pyproject.toml',
    'Package.swift',
    'Makefile',
    'Cargo.toml',
    '.editorconfig',
    'grammar.js',
    '.tree-sitter-config.json',
];

pathsToDelete.forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`Deleted directory: ${dir}`);
    }
});

// Read the existing package.json from the project root
const packageJsonPath = path.join(__dirname, '../../package.json');
let packageJson;

try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (err) {
    console.error(`Error reading package.json: ${err.message}`);
    process.exit(1);
}

// Unwanted entries to delete
const unwantedEntries = [
    'peerDependencies',
    'peerDependenciesMeta',
    'types',
    'files',
    'tree-sitter'
];

// Remove unwanted entries
unwantedEntries.forEach(entry => {
    delete packageJson[entry];
});

// Remove specific scripts
const unwantedScripts = [
    'install',
    'prebuildify',
    'node-gyp-build'
];

if (packageJson.scripts) {
    unwantedScripts.forEach(script => {
        delete packageJson.scripts[script];
    });
}

// Remove specific dependencies and devDependencies
const unwantedDependencies = [
    'prebuildify',
    'node-gyp-build'
];

if (packageJson.dependencies) {
    unwantedDependencies.forEach(dep => {
        delete packageJson.dependencies[dep];
    });
}

if (packageJson.devDependencies) {
    unwantedDependencies.forEach(dep => {
        delete packageJson.devDependencies[dep];
    });
}

// Save the modified package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Unused directories, files, and package.json entries deleted.');