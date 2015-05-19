# HTML5 Protractor Tools Documentation - Console Logs

## Functions

### `consoleLogs(done)`

Returns a Promise Object that contains an array of console logs.

```
html5.consoleLogs.consoleLogs(done);
```

## Usage Example

Access to the console logs allows writing tests that verify that no errors are thrown to the console. Note that accessing the browser logs will always return all the browser logs. If you wish to start each test with a clean log, you should ideally restart the application you wish to test.

```javascript
afterEach(function (done) {
    var consoleLogPromise = sgpt.consoleLogs.consoleLogs(done);
    consoleLogPromise.then(function (browserLogs) {
        browserLogs.forEach(function (log) {
            expect(log.level.value > 900).toBeFalsy();
        });
    });
});
```
Notes:

* The test's `done` function is passed to the `consoleLogs(done)`. The `done` function is called by the `consoleLog` function when
the logs have been populated. While it is not necessary to pass a `done` function, it solves synchronization issues in some tests.
* The `browserLogs` array contains a `log` object for each line in the logs. The `log` object contains the following attributes:

```javascript
{
    level: {
        value: 1000,
        name: 'SEVERE'
    },
    message: 'the severe errror message',
    timestamp: 1432029414834,
    type: ''
}
```

Values of less than 900 are considered messages, and bigger or equal to 900 are errors.
