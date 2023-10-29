# Jobs API Backend
This project is a RESTful API built with Node.js and Express.js that allows users to manage job listings. It utilizes MongoDB as a database and Mongoose as an interface between the server and the database. The API includes user registration, login functionality, and secure job management routes. Additionally, the project is secured using various security packages such as Helmet, CORS, express-rate-limiter, and XSS. The API documentation is facilitated using Swagger UI, and the project is deployed on Render for global access.

- #### [View The Live Project](https://jobs-api-project-9eau.onrender.com)

## Table Of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Routes](#routes)
- [Security](#security)
- [Database](#database)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## Features
- User registration and login functionality.
- Token-based authentication for secure access to job management routes.
- Secure communication with the database through Mongoose's validation functionalities.
- Implementation of security packages such as Helmet, CORS, express-rate-limiter, and XSS.
- Integration of Swagger UI for easy testing and documentation of the API.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/Soham56/Jobs-Api-Project.git
    ```

2. Run npm install to install the required dependencies:

    ```bash
    npm install
    ```

3. Set up your MongoDB database and configure the connection string in the `.env` file.

4. Start the development server:

    ```bash
    npm start
    ```

Ensure that the necessary environment variables are set up correctly for the MongoDB connection.

Now you should be able to access the API at the specified port and begin testing the various routes and functionalities.

## Routes

### Authetication Routes

- `POST api/v1/auth/register`: Registers a new user. Requires a unique email address.
- `POST api/v1/auth/login`: Allows registered users to log in. Returns an authentication token.

### Job Routes

- `POST api/v1/jobs`: Creates a new job listing.
- `GET api/v1/jobs`: Retrieves all job listings.
- `GET api/v1/jobs/:jobId`: Retrieves a single job listing by its ID.
- `PUT api/v1/jobs/:jobId`: Updates a specific job listing by its ID.
- `DELETE api/v1/jobs/:jobId`: Deletes a job listing by its ID.

### Home Route

- `GET /`: Home route .

## Security

The following security packages have been integrated into the project:

- Helmet: Provides various HTTP headers for security.
- Cors: Enables Cross-Origin Resource Sharing (CORS).
- Express Rate Limiter: Controls the rate of requests to prevent abuse.
- XSS: Prevents Cross-Site Scripting attacks.

## Database

The API interacts with MongoDB using Mongoose as an interface. MongoDB validation is implemented to ensure the persistence of data.

## API Documentation

Swagger UI has been integrated to allow for testing the API in the browser. Access the API documentation by navigating to `/api-docs`.

## Deployment

The project is deployed on Render for worldwide access. Ensure that the necessary environment variables are configured in the deployment environment.