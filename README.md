*# Next.js 14 with High Order Components (HOCs) using react-recompose

## Overview

[Next.js](https://nextjs.org) 14 is an advanced React framework that simplifies building fast, scalable web applications with features like server-side rendering and static site generation. When combined with React-Recompose, a library for creating Higher-Order Components (HOCs), developers can easily add extra functionality to components without altering their core logic. React-Recompose helps manage state and lifecycle methods in a clean and reusable way, making it easier to organize and enhance the behavior of components in a Next.js 14 application, leading to more maintainable and efficient code.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### ESLint Rules

- **simple-import-sort**
  - Ensures imports and exports are sorted consistently, improving readability and maintainability.
  - Example:

    ```ts
    // Correct (✅): Imports are sorted alphabetically
    import { b } from 'b';
    import { a } from 'a';

    // Incorrect (❌): Imports are not sorted
    import { a } from 'a';
    import { b } from 'b';
    ```

- **no-console**
  - Disallows console statements (Error on console.log).
  - Example:

    ```ts
    // Correct (✅): No console.log
    const a = 10;

    // Incorrect (❌): using console.log (throws error)
    const a = 10;
    console.log(a); // disallowing
    ```

- **no-multiple-empty-lines**
  - Restricts consecutive empty lines to improve code cleanliness.
  - Example:

    ```ts
    // Correct (✅): Only 1 empty line between code blocks
    const a = 5;

    const b = 10;

    // Incorrect (❌): More than 1 empty line between statements
    const a = 5;


    const b = 10; // ❌ Error: More than 1 empty line
    ```

- **comma-dangle**
  - Enforces no trailing commas in your code.
  - Example:

    ```ts
    // Correct (✅): No trailing commas
    const person = {
      name: 'Alice',
      age: 25
    };

    // Incorrect (❌): Trailing comma after last property
    const person = {
      name: 'Alice',
      age: 25, // ❌ Error: Trailing comma
    };
    ```

- **object-curly-spacing**
  - Enforces spaces inside object braces.
  - Example:

    ```ts
    // Correct (✅): Space inside object braces
    const person = { name: 'Alice', age: 25 };

    // Incorrect (❌): No space inside object braces
    const person = {name: 'Alice', age: 25}; // ❌ Error: No space inside object braces
    ```

- **semi**
  - Enforces the use of semicolons at the end of statements.
  - Example:

    ```ts
    // Correct (✅): Semicolons are used at the end of each statement
    const a = 10;
    const b = 20;

    // Incorrect (❌): Missing semicolon
    const a = 10 ❌ Error: Missing semicolon
    const b = 20 ❌ Error: Missing semicolon
    ```

## Getting Started

### Step 1: Copy Environment Variables

```bash
cp .env.example .env
```

### Step 2: Initiate Git-Convention

```bash
npx @sabo99/git-convention init
```

### Step 3: Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Step 4: Run the Unit Tests

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

### Step 5: Run the Linter

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
# or
bun lint
```

### Step 6: Run the Linter with Fix Option

```bash
npm run lint:fix
# or
yarn lint:fix
# or
pnpm lint:fix
# or
bun lint:fix
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
*
````
