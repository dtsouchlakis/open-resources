# Open HR

This project is an HR platform built with Prisma, Next.js, and NextAuth.js.

## Purpose

The purpose of this project is to provide a flexible and customizable HR platform solution. It leverages Prisma for database management, Next.js for server-side rendering, and NextAuth.js for authentication.

## Features

- User authentication with NextAuth.js
- Database management with Prisma
- Frontend and backend built with Next.js for server-side rendering
- Customizable and extendable for various HR management needs

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Set up docker and Nodejs
4. run the database using `Docker compose up`
5. Update the database using `yarn prisma migrate deploy` or `npx prisma migrate deploy`
6. Create an .env file and add the following variables:
   - DATABASE_URL
   - POSTGRES_USER
   - POSTGRES_PASSWORD
   - POSTGRES_DB
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - ...Any other auth provider secrets
7. Run the development server using `npm run dev` or `yarn dev`.
8. Access the application in your web browser at `http://localhost:3000`.

## Usage

This HR platform can be customized and extended to meet specific organizational HR management needs. Developers can add additional features, modify existing functionality, and integrate with other systems as necessary.

## License

[Open Resources](https://github.com/dtsouchlakis/open-resources) © 2024 by [Tsouchlakis Dionysios Lazaros](https://github.com/dtsouchlakis) is licensed under [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1)
