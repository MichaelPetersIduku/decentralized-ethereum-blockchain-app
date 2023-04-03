# Decentralized Ethereum BlockChain Application
This is a decentralised application on Ethereum blockchain with a backend service that handles the business logic and data storage for the application.
More update can still be made such as:
- Adding a workflow file to deploy to AWS Lambda
- Validate incoming request using joi validator
- Add unit test cases for functions in Web3ConnectionClass and services class
- Create route for creating more accounts on the blockchain
- Encrypt the private keys and use them to sign transactions


This repo is functionality complete — PRs and issues welcome!

# Demo Url
https://decentralized-ethereum-app.herokuapp.com

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run start` to start the local server
- `npm run test` to run test cases
- Create a .env file in the project root directory and ensure the following env variables are specified
  - MONGODB_URL
  - ETHEREUM_PROVIDER_WS
  - PRIVATE_KEY

# API Documentation
Click the link for API documentation with available routes and request examples: [https://documenter.getpostman.com/view/6889344/UyxnFRJR
](https://documenter.getpostman.com/view/6889344/2s93RWPB9z)
# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [base-64](github.com/mathiasbynens/base64) - For encoding and decoding url strings
- [body-parser](github.com/expressjs/body-parser) - Node js body parsing middleware
- [cors](github.com/expressjs/cors) - Used to enable cors with various options
- [mongoose](https://www.npmjs.com/package/mongoose) - Nodejs ORM for mongodb
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) - A custom pagination library for Mongoose with customizable labels
- [secreta](https://www.npmjs.com/package/secreta) - For managing secret keys and config
- [winston](github.com/winstonjs/winston) - For logging anything

## Application Structure
- `logs/` This is where all log files are stored
- `scripts/` Contains predeploy scripts
- `src/@core/common/` where all universal files with generic functions that can be called from other files when extended
- `src/@core/database/` This folder contains the connections to databases
- `src/@core/interfaces/` This folder contains all interface files used as types
- `src/api/`This folder contains all api modules which contains the route file, controller file, service file, model and validator file for each module. This API contains only one api module which is the `questions` module.
- `src/util/` contains logger and middleware files along with any other utility files
- `src/app.ts` The entry point to our application. This file defines our express server and connects it to the SQL database using sequelize. It also requires the routes we'll be using in the application.
- `src/server.ts` Contains the server setup
- `Procfile` Heroku file for deployment to heroku
- `.gitignore`
- `package.json`
- `package-lock.json`
- `tsconfig.json`

## Error Handling

In `src/@core/common/universal.service.ts`, we define failureResponse and serviceErrorHandler functions for returning the errors with their respective status codes and error messages. Service files for the different modules under `src/api/` folder extends the universal.service.ts file to return the necccessary errors in this file.
In `src/@core/common/universal.controller.ts`, we define controllerErrorHandler function to handle errors from the controller classes which extends this universal.controller.ts file


<br />
