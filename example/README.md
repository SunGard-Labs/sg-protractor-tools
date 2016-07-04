# SunGard Protractor Tools Demo Application

This basic Angular application showcases the usage of `sg-protractor-tools` for writing end-to-end tests with Protractor.
The test cases may be found in the [test/e2e](test/e2e) folder.

Notice the special settings in [protractor.conf.js](protractor.conf.js) regarding the required arguments/flags Google Chrome needs to be started with.

## Setup

Execute the following to install all necessary dependencies of the demo application:

```bash
npm install
bower install
```

## Run Tests

- Start a local server by executing `grunt serve`. The server will be available at `http://localhost:9000` by default.
- Run the e2e tests by executing `grunt protractor` from a second terminal. The test cases will run against the server started using the above command.

## Test Code

The test cases highlighting the usage of the `sg-protractor-tools` library can be found in the [test/e2e/](test/e2e) folder.

The `memory.js` test case will generate its result files in the `example` folder.
