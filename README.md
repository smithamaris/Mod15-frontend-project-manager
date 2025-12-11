Project Manager App (MERN):

1- A description of the project.
Features
User registration and login (JWT-based auth)
GitHub OAuth login (optional)
Auth-protected API routes
Project CRUD (create, list, update, delete)
Task CRUD scoped to a project (create, list, update, delete)
Ownership checks so users can only access their own data
React SPA with routing (Home, Auth, Projects, Project Details)
Task creation and editing per project
Loading and error feedback in the UI

2- Instructions for setting it up and running it locally.
Created a .env file in the backend folder:

MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173

# Optional GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/users/auth/github/callback

Create a .env file in the frontend folder:
VITE_BACKEND_URL=http://localhost:4000




3- A list and description of your API endpoints.
API Endpoints
Base URL: http://localhost:4000
All protected routes require a JWT in the Authorization header: Authorization: Bearer <token>

Auth / Users
- POST /api/users/register ( 
  Register a new user.
Body: { "username": string, "email": string, "password": string }
Response: created user (password hashed).
)
- POST /api/users/login (Login user and receive JWT.
Body: { "email": string, "password": string }
Response: { "token": string, "user": User }
)
- GET /api/users (protected, admin only)
Return all users.
- GET /api/users/:id (Get a single user by id (example route).
)
- GET /api/users/auth/github (Start GitHub OAuth flow.
)
- GET /api/users/auth/github/callback (OAuth callback; issues JWT and redirects to frontend with ?token=.
)

Tasks (Protected, ownership-based)
- POST /api/projects/:projectId/tasks (Create a new task in the given project.
Body: { "title": string, "description"?: string, "status": "Todo" | "in-progress" | "done" }
)
- GET /api/projects/:projectId/tasks (Get all tasks for a project the user owns.
)
- PUT /api/tasks/:taskId (Update a task’s details or status (only if it belongs to a project owned by the user).
Body: { "title"?: string, "description"?: string, "status"?: "Todo" | "in-progress" | "done" }
)
- DELETE /api/tasks/:taskId (Delete a task (only if it belongs to a project owned by the user).
)