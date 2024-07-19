import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
    entry: ['src/index.tsx'],
    format: ['esm', 'cjs'],
    dts: true,
    external: ['react'],
    injectStyle: true,
    splitting: false,
    sourcemap: true,
    clean: !options.watch, // Only clean when not in watch mode
    treeshake: true,
    minify: !options.watch, // Only minify when not in watch mode
}));