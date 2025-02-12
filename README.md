# Group Chat Application

## Overview

This is a **Group Chat Application** built using **Express.js, Mongoose, JWT, Passport.js, and TypeScript**. It allows users to create and manage group chats with features like public/private groups, admin roles, and user authentication.

## Features

- User authentication
- Group creation and management
- Admin controls
- RESTful API with Swagger documentation

## Technologies Used

- **Node.js** (Runtime)
- **Express.js** (Backend Framework)
- **Mongoose** (For Making Query to Database)
- **MongoDB** (Database - based on preference)
- **JWT-based Authentication**
- **Swagger** (API Documentation)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Ashishbhatt75way/chat-app-backend.git
   cd chat-app-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_database_url
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm run start
   ```

## 📖 API Documentation (Swagger)

- **Available at**: `http://localhost:5000/api-docs`
- **Example User Registration:**
  ```json
  {
    "name": "user",
    "email": "user@example.com",
    "password": "Secure@123",
    "active":true
  }
  ```

## Project Related Attachments

- Entity Relation Diagram Link

   ```
      https://drive.google.com/file/d/1CPhwUJ-sh-YE6yD_Jx94baBEyDLG5YoT/view?usp=drive_link
   ```

- Swagger Video Attachment

   ```
      https://drive.google.com/file/d/1gDYvrmHYL0qjcou6HwgeV7xqm7n2wcFr/view?usp=drive_link
   ```


## Folder Structure

```
chat-app-backend/
│── app/
│   ├── common/
│   │   ├── middleware/       # Authentication & error handling middleware
│   ├── services/             # Business logic & service layer
│   ├── group/
│   │   ├── group.controller.ts # Group-related controllers
│   │   ├── group.route.ts      # Group-related routes
│   │   ├── group.schema.ts     # Group schema definition
│   │   ├── group.service.ts    # Group service layer
│   │   ├── group.validation.ts # Group validation rules
│   ├── user/
│   │   ├── user.controller.ts # User-related controllers
│   │   ├── user.route.ts      # User-related routes
│   │   ├── user.schema.ts     # User schema definition
│   │   ├── user.service.ts    # User service layer
│   │   ├── user.validation.ts # User validation rules
│── node_modules/              # Dependencies
│── .env.local                 # Environment variables
│── .gitignore                 # Git ignore file
│── index.ts                   # Main server entry point
│── nodemon.json                # Nodemon configuration
│── package.json                # Project metadata
│── README.md                   # Documentation
│── swagger-backup.json         # API documentation backup
│── tsconfig.json               # TypeScript configuration
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Authenticate user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user details
- `PATCH /api/users/:id` - Partially update user
- `DELETE /api/users/:id` - Delete user

### Groups

- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group by ID
- `POST /api/groups` - Create a new group
- `PUT /api/groups/:id` - Update group details
- `DELETE /api/groups/:id` - Delete group
- `POST /api/groups/:id/add` - Add members to a group
- `PUT /api/groups/:id/make` - Make new group Admin
- `PUT /api/groups/:id/remove-admin` -  Remove group Admin


