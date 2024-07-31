# Next Gen AI in Next.js

This project is a Next.js application that showcases next-generation AI capabilities. It uses Clerk.com for authentication, Drizzle and Neon Postgres for database management, and Gemini API for API integration.

## Demo

Check out the [live demo](https://next-gen-ai-29hf.vercel.app/).

![Next Gen AI Screenshot](Screenshot (93).png)

## Features

- **Authentication**: Secure user authentication using Clerk.com
- **Database**: Robust database setup with Drizzle and Neon Postgres
- **API Integration**: Integration with Gemini API for enhanced functionality

## Tech Stack

- **Next.js**: A React framework for server-side rendering and generating static websites
- **Clerk.com**: User authentication and management
- **Drizzle**: Database ORM
- **Neon Postgres**: Postgres database
- **Gemini API**: API integration for additional features

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/next-gen-ai.git
    cd next-gen-ai
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root of the project and add the following:

    ```env
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
    CLERK_API_KEY=<your-clerk-api-key>
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
    GEMINI_API_KEY=<your-gemini-api-key>
    ```

### Database Setup

1. Initialize the database with Drizzle:

    ```bash
    npx drizzle-kit generate:sql
    npx drizzle-kit push
    ```

2. Verify the database connection:

    ```bash
    npx drizzle-kit migrate
    ```

### Authentication Setup

1. Set up Clerk.com for user authentication:

    - Sign up for a Clerk.com account.
    - Create a new application.
    - Obtain the `frontend_api` and `api_key` from the application settings.

2. Update your `.env.local` file with the Clerk API keys.

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

This application integrates with the Gemini API for additional features. Make sure to obtain your API key from the Gemini API documentation and add it to your `.env.local` file.

### Example Usage

To use the Gemini API, you can create a service in your Next.js application.

