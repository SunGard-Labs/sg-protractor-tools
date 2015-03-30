# SunGard Protractor Tools Demo Application

This basic angular application showcases the usage of sg-protractor-tools for writing e2e test with protractor.
The test cases may be found in the [test/e2e](test/e2e) folder.

Notice the special settings in [protractor.conf.js](protractor.conf.js) regarding the required arguments/flags Google Chrome needs to be started with.

## Setup
Execute `npm install` and `bower install` to install all necessary dependencies of the demo application.

## Run tests
- Start server by executing `grunt serve`. Server will be available at `http://localhost:9000` by default
- Run e2e tests by executing `grunt protractor`