# Vercel Foundation with Turbo

This is a monorepo project using Turborepo with pnpm and the following tech stack:

- Frontend: NextJS, NextUI, TailwindCSS, React, JavaScript, TypeScript
- Backend: Prisma, PostgreSQL, ZenStack, Turborepo, Storybook, Swagger
- Deployment & Infrastructure: Vercel, Docker
- Testing & CI/CD: Cypress, Vitest, Husky
- Authentication & Analytics: Auth0, RudderStack, GrowthBook
- Build Tools: Vite

## Project Structure

- `/apps`: Contains all applications
  - `/main-web`: NextJS web application
- `/packages`: Contains shared packages (to be added)

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run the development server: `pnpm dev`

## Available Scripts

- `pnpm build`: Build all applications and packages
- `pnpm dev`: Start the development server for all applications
- `pnpm lint`: Run linting for all applications and packages
- `pnpm format`: Format all files using Prettier

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.