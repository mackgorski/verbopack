const { nextui } = require("@nextui-org/theme");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         "./src/**/*.{js,ts,jsx,tsx}",
//         "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
//         "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//     ],
//     theme: {
//         extend: {},
//     },
//     darkMode: "class",
//     plugins: [nextui()],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui()],
};