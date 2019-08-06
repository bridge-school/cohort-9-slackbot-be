## Installation

```sh
$ npm install
```

## Setup the app for local development

We are using Firebase [cloud fire store](https://firebase.google.com/docs/firestore/quickstart) for our database.

To setup a connection to the database:

1. Have a look in your project slack channel for a pinned JSON file called `firebase-credentials.json`.
2. Create a `firebase-credentials.json` file in the root directory of this repository and copy the contents from the file in the slack channel
3. Run `yarn start:local` and if everything is running smoothly you should see no errors
4. To test your server is running correctly, go to `http://localhost:8081/health` in your browser. If you see `{ ok: 'OK' }` then everything is running as expected. If you're not seeing this, reach out to your tech lead or mentor over slack to help you debug!

To query the database you will need to `require` the `db` instance that is exported from `db/index.js`. You can use the [firebase docs](https://firebase.google.com/docs/firestore/query-data/get-data) and have a look under the node.js tab for examples.

## Run the app for local development

```sh
$ npm run start:local
```

## Run the app in production

```
$ npm start
```

## Folder Structure

```
   |-api
   |-db
   |-middleware
   |-routes
   |---health
   |-utils
```

### `api`

This is where you add new routes, see the example `health` route.

### `db`

This is where the Firebase connection is configured. To query the database you will need to `require` the `db` instance that is exported from `db/index.js`.

### `middleware`

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.

Middleware can be at the application level or at the router level. You won't be interacting with this folder much.

### `routes`

This is where all the logic for your endpoints will live. You should make a new folder under `routes` for each set of endpoints you will write, similar to the `health` folder that exists as an example.

### `utils`

This is a multi-purpose folder for any extra utility functions that you might want to reuse throughout your app.

## Project Workflow

### Setting up

- Clone your git repos directly (do not fork!)
- Follow the setup instructions for each repo in the respective READMEs
- Run the app

### Development Workflow

- Pick a feature / part of a feature from your project board and assign it to yourself. Move the ticket into in progress and make sure your whole team knows you are working on it.
- Pull the most recent version of master and create a branch off it
    - For a feature: `feat/<name of your feature>`
    - For a bug: `bug/<name of bug>`
    - For a chore: `chore/<name of chore>`
- Work on your ticket
- Once you are ready to get some feedback on your code, push your branch
    - `git push origin <name of your branch>`
- Go to GitHub and create a Pull Request
    - The title should be formatted as `[Feature/Bug/Chore][Ticket #] Title of what you did`
    - In the description make sure to link to the ticket and include any relevant screenshots
    - Describe all the changes you have made
- Assign your team members for review, once you have one approval you can merge your code
- Your code will be automatically deployed to the development environment

### General Tips

- Break your features into small chunks of work
- Try to keep PRs as small and single purpose as possible
- Use your class time to break up work, review PRs and make sure everyone leaves with an idea of what they are working on
- Bug people to review your PRs!
- If you have many PRs open, prioritize getting them reviewed and merged over starting new work
