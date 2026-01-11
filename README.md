# MERN Stack Notes App

A simple Notes application built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to sign up, log in, create, edit, delete, and pin notes.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud URI)

## Getting Started

### 1. Backend Setup

The backend runs on port 5000 by default.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**: Create a `.env` file in the `backend` directory with the following content:
    ```env
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/mern_notes_app
    JWT_SECRET=my_super_secret_key_123
    ```
    *(Note: Replace `MONGO_URI` with your connection string if different. Change `JWT_SECRET` to a secure string.)*

4.  Start the server:
    ```bash
    npm start
    # or for development with nodemon:
    npm run dev
    ```

### 2. Frontend Setup

The frontend runs on Vite (default port 5173).

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Features

- **Authentication**: Secure Login and Signup using JWT.
- **Notes Management**: Create, Read, Update, and Delete notes.
- **Pinning**: Pin important notes to the top of the dashboard.
- **Search**: Filter notes by title, content, or tags.
- **Profile**: View basic user information.
