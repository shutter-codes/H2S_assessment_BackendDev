# Task Management API

This is a Node.js and Express-based API for managing tasks and subtasks. It provides endpoints for user registration, login, and CRUD operations on tasks and subtasks.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Add, retrieve, update, and delete subtasks for each task
- Soft deletion of tasks and subtasks

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB database connection

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/task-management-api.git
   ```

2. Install the dependencies:

   ```
   cd task-management-api
   npm install
   ```

3. Create a `.env` file in the root directory and provide the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. Start the server:

   ```
   npm start
   ```

   The API will be running at `http://localhost:3000`.

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user and retrieve a JWT token

### Task Routes

- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:taskId` - Update a task by ID
- `DELETE /api/tasks/:taskId` - Delete a task by ID

### Subtask Routes

- `GET /api/tasks/:taskId/subtasks` - Get all subtasks for a specific task
- `POST /api/tasks/:taskId/subtasks` - Add a new subtask to a task
- `PUT /api/tasks/:taskId/subtasks` - Update subtasks for a task
- `DELETE /api/tasks/:taskId/subtasks/:subtaskId` - Delete a subtask by ID

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include the JWT token in the `Authorization` header of the request.

Example:
```
Authorization: Bearer your-jwt-token
```

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios, such as invalid credentials, missing fields, or resource not found.

## License

This project is licensed Developed under the assessment of H2S Hiring Process.