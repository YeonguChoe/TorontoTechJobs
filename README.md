# TorontoTechJobs

TorontoTechJobs is a job board application focused on tech-related jobs within the Greater Toronto Area (GTA) and remote positions.

## Backend Installation

### Clone Repository

- Clone the backend repository:
  ```bash
  git clone https://github.com/YeonguChoe/TorontoTechJobs.git
  cd TorontoTechJobs/be
  ```

### Install Dependencies

- Install Node.js dependencies:
  ```bash
  npm install
  ```

### Set Up Environment Variables

- Create a `.env` file in the root directory with the following variables:
  ```php
  DATABASE_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
  ```
- Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB Atlas credentials and JWT secret.

### Start the Server

- Start the backend server:
  ```bash
  npm start
  ```

## Frontend Installation

- Open another terminal, navigate to frontend repository:
  ```bash
  cd TorontoTechJobs/fe
  ```

### Install Dependencies

- Install Node.js dependencies:
  ```bash
  npm install
  ```

### Run the Frontend

- Run the frontend application:
  ```bash
  npm start
  ```
- The frontend should now be accessible on [http://localhost:3000](http://localhost:3000).

## Usage

- Register a new user using `/users/register`.
- Log in to receive a JWT token using `/users/login`.
- Create, update, delete job postings using `/jobs` endpoints.
- Filter job postings by company name or job type using `/jobs/filter-by-company-name` and `/jobs/filter-by-job-type`.

## API Endpoints

### Users

- **POST /users/register**: Register a new user.
- **POST /users/login**: Login and get a JWT token.
- **PATCH /users/update**: Update user information (requires authentication).

### Jobs

- **GET /jobs**: Get all job postings.
- **GET /jobs/filter-by-company-name?company_name=<company_name>**: Get jobs by company name. (requires authentication)
- **GET /jobs/filter-by-job-type?job_type=<job_type>**: Get jobs by job type (frontend, backend, fullstack, mobile, machine learning).
- **GET /jobs/**: Get a job by ID.
- **POST /jobs**: Create a new job posting (requires authentication).
- **PATCH /jobs/** : Update a job posting (requires authentication).
- **DELETE /jobs/** : Delete a job posting (requires authentication).

## Technologies Used

- React
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcrypt for password hashing
- Express Validator for input validation
