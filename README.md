# SunGard Protractor Tools

Version: 0.2.0-SNAPSHOT

This project provides a reusable library of functions simplifying the testing of HTML5 applications using Protractor.

## Setup

To include this library in your own project, use the following command:

```
npm install --save-dev sg-protractor-tools
```

This will include the library in your project's `package.json` file as a _development dependency_.

## Usage

To use the library in your code, use the following code to import it:

```
var sgPro = require('sg-protractor-tools');
```

This will expose the libraries main object as `sgPro` in your code. You can use the library's functions by referencing the `sgPro` object, e.g. for scrolling:

```
sgPro.scroll.scrollTo(...);
```

The library's functions are split up by their domain, e.g. all functions relating to resizing windows are grouped under the `sgPro.resize` object.

## Examples

The [example](example) folder contains an example application with e2e tests that showcase how to use this library with Protractor.

The `README` in that folder lists all the tests that you can run, gives details about each one, as well as guidance on how to run them.

## Documentation

Detailed documentation on the library's functions can be found in the [docs](docs) folder.

## Contributing

This project uses Git-Flow as its development model. Any changes need to be made against the _develop_ branch.

### Local Installation

 * Clone the project to a local folder
 * Use `npm link` to install it locally
 * Use `npm link sg-protractor-tools` in your application's directory to install the local development version

### Release

Use the following commands to create a new release if required:

```
grunt release --releaseVersion 0.2.0 --developVersion 0.3.0-SNAPSHOT
```

## Dependencies

- [Node.js](http://nodejs.org/)
- [NPM](https://npmjs.org/)
- [Bower](http://bower.io/)
- [Grunt](http://gruntjs.com/)
- [Protractor](https://github.com/angular/protractor)

## License

Copyright © SunGard 2015. Licensed under the MIT license.
