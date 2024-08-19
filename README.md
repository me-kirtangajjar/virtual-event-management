
# Virtual Event Management

## Overview

This project is a backend system designed for a virtual event management platform, enabling user registration, event scheduling, and participant management. It is built using Node.js with Express.js and MongoDB for data storage. The system focuses on secure user authentication, event management, and participant handling.

## Features

- **User Authentication:**
  - Registration and login using bcrypt for secure password hashing.
  - JWT-based token authentication for session management.
  
- **Event Management:**
  - Create, update, and delete events.
  - Events store details like date, time, description, and participants in a MongoDB database.
  - Access to event management features is restricted to authenticated and authorized users.

- **Participant Management:**
  - Users can register for events.
  - Participant lists are managed in MongoDB, handling all attendee registrations.

- **API Endpoints:**
  - `POST /register`: User registration.
  - `POST /login`: User login.
  - `GET /events`: Fetch all events.
  - `POST /events`: Create a new event.
  - `PUT /events/:id`: Update an existing event.
  - `DELETE /events/:id`: Delete an event.
  - `POST /events/:id/register`: Register for an event.

- **Asynchronous Operations:**
  - Email notifications are sent asynchronously upon successful event registration.

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/me-kirtangajjar/virtual-event-management
   ```
   
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file in the project root with the following variables:
     ```plaintext
     PORT = <your_port_number>
     DATABASE = <your_database_connection_string>
     JWTTOKENKEY = <your_jwt_token_key>
     EMAILUSER = <your_email_user>
     EMAILPASS = <your_email_password>
     ```
   - Replace `<your_port_number>`, `<your_database_connection_string>`, `<your_jwt_token_key>`, `<your_email_user>`, and `<your_email_password>` with your actual configurations.

4. **Run the server:**
   ```bash
   npm start
   ```

## Technologies Used

- **Node.js & Express.js**: Backend framework.
- **MongoDB & Mongoose**: Database and ORM for data management.
- **bcrypt**: Password hashing.
- **JWT**: Token-based authentication.
- **nodemailer**: Sending email notifications.
