# Graduation Project - Q&A System

This is a full-stack Question and Answer application built using **Express** and **Mongoose** for the backend and **React** with **Vite** for the frontend. The application supports user authentication, question/answer management, and more.

## Project Structure

- `backend/`: The server-side code built with Node.js, Express, and Mongoose.
- `frontend/`: The client-side application developed with React and Tailwind CSS.

## Features

- Backend:
  - User authentication with JWT
  - API endpoints for questions and answers
  - MongoDB integration for data storage
- Frontend:
  - Responsive UI with Tailwind CSS
  - React Router for navigation
  - Redux for state management
  - JSON server for mock API (dev mode)

## Scripts

### Backend (`package.json`)

- `start`: Runs the backend server
- `server`: Runs the backend server with auto-reload and environment variables
- `client`: Runs the frontend dev server from the backend
- `dev`: Runs both the backend and frontend concurrently

### Frontend (`package.json`)

- `dev`: Starts the frontend dev server
- `build`: Builds the production-ready frontend
- `lint`: Lints the frontend code
- `preview`: Serves the built frontend locally
- `questions-server`: Starts a mock server for questions data
- `articles-server`: Starts a mock server for articles data

## How to Run

### Prerequisites

- Node.js installed
- MongoDB server running locally or a connection string for MongoDB Atlas

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mustafa7assan/graduation-project.git
   cd graduation-project
   ```
2. Install dependencies for both backend and frontend:
   cd backend
   npm install
   cd ../frontend
   npm install
3. Start the backend and frontend servers:
   cd backend
   npm run dev
4. Open the app in your browser at http://localhost:3000.

Here’s a README.md file for your project:

markdown
Copy code

# Graduation Project - Q&A System

This is a full-stack Question and Answer application built using **Express** and **Mongoose** for the backend and **React** with **Vite** for the frontend. The application supports user authentication, question/answer management, and more.

## Project Structure

- `backend/`: The server-side code built with Node.js, Express, and Mongoose.
- `frontend/`: The client-side application developed with React and Tailwind CSS.

## Features

- Backend:
  - User authentication with JWT
  - API endpoints for questions and answers
  - MongoDB integration for data storage
- Frontend:
  - Responsive UI with Tailwind CSS
  - React Router for navigation
  - Redux for state management
  - JSON server for mock API (dev mode)

## Scripts

### Backend (`package.json`)

- `start`: Runs the backend server
- `server`: Runs the backend server with auto-reload and environment variables
- `client`: Runs the frontend dev server from the backend
- `dev`: Runs both the backend and frontend concurrently

### Frontend (`package.json`)

- `dev`: Starts the frontend dev server
- `build`: Builds the production-ready frontend
- `lint`: Lints the frontend code
- `preview`: Serves the built frontend locally
- `questions-server`: Starts a mock server for questions data
- `articles-server`: Starts a mock server for articles data

## How to Run

### Prerequisites

- Node.js installed
- MongoDB server running locally or a connection string for MongoDB Atlas

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mustafa7assan/graduation-project.git
   cd graduation-project
   Install dependencies for both backend and frontend:
   ```

bash
Copy code
cd backend
npm install
cd ../frontend
npm install
Start the backend and frontend servers:

bash
Copy code
cd backend
npm run dev
Open the app in your browser at http://localhost:3000.

Tools and Libraries
Backend:
Express
Mongoose
JWT Authentication
Frontend:
React
Tailwind CSS
Redux Toolkit
React Toastify
License
This project is licensed under the ISC License.
