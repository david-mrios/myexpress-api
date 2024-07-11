# Management API

A simple Node.js API using Express.js and MySQL for managing user data.

## Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Create MySQL database and table:**
    ```sql
    CREATE DATABASE inventory;
    USE inventory;
    CREATE TABLE usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        edad INT NOT NULL
    );
    ```


## Run the Server

Start the server:
```bash
node app.js
```

## API Endpoints

- **Get all users**
  - `GET /`
  - Response: HTML list of all users

- **Search user by ID**
  - `GET /search?id=1`
  - Response: HTML displaying the user's name

- **Create a new user**
  - `POST /create/:name/:age`
  - Example: `/create/John/30`
  - Response: JSON confirmation

- **Update user**
  - `PUT /update`
  - Body: `{ "id": 1, "name": "New Name", "age": 25 }`
  - Response: JSON confirmation

- **Delete user**
  - `DELETE /delete`
  - Body: `{ "id": 1 }`
  - Response: JSON confirmation