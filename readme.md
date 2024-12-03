## Overview

This project contains tests for the [Agify API](https://agify.io/documentation), which exposes a single endpoint to estimate the age of a person, based on a first name.

The project is written in TypeScript and utilises Cucumber to make test scenarios business-readable, Supertest to make HTTP requests and Chai to make assertions.

### Detailed functionality of the API endpoint to be tested
* The `name` query parameter is mandatory
* When the `name` query parameter is not provided, `422 Unprocessable Content` with `{ "error": "Missing 'name' parameter" }` is returned.
* When the `name` query parameter is invalid, `422 Unprocessable Content` with `{ "error": "Invalid 'name' parameter" }` is returned.
* Up to ten names can be passed to a single call.
* The `country_id` query parameter is optional.
* The `apikey` query parameter is optional.
* The endpoint is free to use for up to 100 names per day.
* An API key is required if requests exceed 100 names per day.
* When an invalid API key is provided, `401 Unauthorized` with `{ "error": "Invalid API key" }` is returned.
* When no API key is provided and the requests exceed 100 names per day, `429 Too many requests` with `{ "error": "Request limit reached" }` is returned.
* When an API key is provided and the requests exceed the limit, `429 Too many requests` with `{ "error": "Request limit too low to process request" }` is returned.
* When an API key is provided, but the subscription has expired, `402 Payment Required` with `{ "error": "Subscription is not active" }` is returned.
* The response is in JSON format.

## Dependencies

The project was built with Node version 22.11.0 and npm version 10.9.1.

## Installation

Clone the repository onto your local machine and install the dependencies defined in [`package.json`](./package.json) by executing the below command:

```bash
$ npm i
```

## Running the tests

Execute the below command to run the tests

```bash
$ npm run test
```
