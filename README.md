# README Site

This project turns a repository README into an AI-generated product page. The app reads project information from a README, processes it with AI on the backend, and presents the result as a more polished product-style page on the frontend.

The repository is split into two parts:

- `client` for the frontend app
- `server` for the backend API, generation flow, and database utilities

## Run the Client

Install dependencies and start the frontend in development mode:

```bash
cd client
pnpm install
pnpm dev
```

Create a production build for the client:

```bash
cd client
pnpm build
```

## Run the Server

Install dependencies and start the backend in development mode:

```bash
cd server
pnpm install
pnpm dev
```

Run the Inngest development server:

```bash
cd server
pnpm inngest:dev
```

Build the server:

```bash
cd server
pnpm build
```

Push the database schema:

```bash
cd server
pnpm db:push
```

Open Drizzle Studio:

```bash
cd server
pnpm db:studio
```
