## Installation

```sh
$ yarn install
```

## Run the app locally

```sh
$ yarn start:local
```

## Run the app in production

```
$ yarn start
```

## Middleware

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.

Middleware can be at the application level or at the router level.

## Database

We are using Firebase [cloud fire store](https://firebase.google.com/docs/firestore/quickstart) for our database.

To setup a connection to the database:

1. Have a look in your project slack channel for a pinned JSON file called `firebase-credentials.json`.
2. Create a `firebase-credentals.json` file in the root directory of this repository and copy the contents from the file in the slack channel
3. Run `yarn start:local` and if everything is running smoothly you should see no errors

To query the database you will need to `require` the `db` instance that is exported from `db/index.js`. You can use the [firebase docs](https://firebase.google.com/docs/firestore/query-data/get-data) and have a look under the node.js tab for examples.

## Testing

Using `jest` and `supertest` for API testing.

## Commit messages

In order to keep a clean git history merges should always be squashed with a consistent commit message style.
