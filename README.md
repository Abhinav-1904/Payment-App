# Payment App

## Overview

Payment App is a secure and efficient platform designed for managing transactions. Built with a modern tech stack, it ensures a seamless payment experience for users. The app supports authentication, transaction management, and user-friendly dashboards.

---

## Features

- **User Authentication:** Secure login and signup system.
- **Transaction Management:** Record and view transaction history.
- **Responsive UI:** Built with React for a smooth user experience.
- **Secure Backend:** Ensures data integrity and protection.

---

## Tech Stack

### Frontend

- React
- Tailwind CSS

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL

### DevOps

- Docker for containerization
- GitHub Actions for CI/CD

---

## Prerequisites

- Node.js >= 16.x
- Docker installed
- PostgreSQL database instance

---

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd apps/user-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```env
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
     ```
   - Apply Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Seed the database with initial data:
     ```bash
     npx ts-node db/prisma/seed.ts
     ```
4. Start the backend server:
   use Docker 5432 port(default)

### Docker Setup

1. Build and start the services:
   ```bash
   docker-compose up --build
   ```
2. Access the app at `http://localhost:3002` .

---

## Usage

1. Register or log in as a user.
2. Navigate through the dashboard to view or manage transactions.
3. Use the seeded credentials for testing:
