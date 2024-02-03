# Task List Microservice

This microservice provides a simple API for managing tasks.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd CS361
   cd task-list-api
   ```

2. Initialize your project and install the required dependencies:

   ```bash
   npm init -y
   npm install express body-parser
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:

   ```bash
   npm start
   ```

5. Microservice directory structure:

   ```bash
      task-list-api
   |-- src
   |   |-- controllers
   |   |   |-- taskController.js
   |   |
   |   |-- routes
   |   |   |-- taskRoutes.js
   |   |
   |   |-- services
   |       |-- taskService.js
   |
   |-- tasks.json
   |-- service.js

   ```

The server will be running at `http://localhost:3000`.

## API Endpoints

GET /tasks
Retrieve all tasks.
GET /tasks/:id
Retrieve a task by ID.
POST /tasks
Add a new task.

    curl -X POST -H "Content-Type: application/json" -d '{"task":"New Task","completed":false}' http://localhost:3000/tasks

PUT /tasks/:id
Update a task by ID.
curl -X PUT -H "Content-Type: application/json" -d '{"task":"Updated Task","completed":true}' http://localhost:3000/tasks/50

DELETE /tasks/:id
Delete a task by ID.
curl -X DELETE http://localhost:3000/tasks/50

## Testing with curl

### CRUD:

Post (Create/add) a new task:
curl -X POST -H "Content-Type: application/json" -d '{"task":"New Task","completed":false}' http://localhost:3000/tasks

Get all tasks (Read):
curl http://localhost:3000/tasks

GET a specific task by ID (Read)
curl http://localhost:3000/tasks/48

Put (update) a task:
curl -X PUT -H "Content-Type: application/json" -d '{"task":"Updated Task","completed":true}' http://localhost:3000/tasks/50

Delete a task:
curl -X DELETE http://localhost:3000/tasks/50

### Test Live Link

To test the task list backend API, it seamlessly hosted on [Render.com](https://render.com/) at [Task List API](https://task-list-api-u4p8.onrender.com/).
You can use the same curl commands, replacing `http://localhost:3000` with the live link (`https://task-list-api-u4p8.onrender.com/`).

This README.md file provides detailed instructions for installation, API endpoints, and testing using `curl`.
