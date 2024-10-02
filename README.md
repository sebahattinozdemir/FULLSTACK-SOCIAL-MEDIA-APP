# Social Media App - Server

This is the server-side application for a social media app built using Node.js, Express, and MongoDB (Mongoose).

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [License](#license)

## About

This is the backend for a social media application, responsible for handling API requests, managing user data, and storing information in a MongoDB database.

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
   
2. Navigate to the server directory:
    ```bash
    cd server
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the required environment variables (example):
    ```
    PORT=3000
    MONGO_URI=<your-mongodb-uri>
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
   
2. The server will run on the port specified in the `.env` file (`PORT`). By default, it runs on `http://localhost:3000`.

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file.
- [express](https://www.npmjs.com/package/express) - A web framework for Node.js.
- [helmet](https://www.npmjs.com/package/helmet) - Provides security by setting various HTTP headers.
- [mongodb](https://www.npmjs.com/package/mongodb) - MongoDB driver for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose) - ODM for MongoDB and Node.js.
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon) - A tool for automatically restarting the server during development.

## Scripts

- `npm start` - Starts the server using `nodemon` to watch for file changes.

## License

This project is licensed under the [ISC License](LICENSE).
