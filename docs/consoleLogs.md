# HTML5 Protractor Tools Documentation - Console Logs

## Functions

### `expectNoErrors(testSuite)`, `expectNoWarnings(testSuite)`, `expectNoInfo(testSuite)`

Convenience function that tests in "afterEach" callback of the given jasmine test suite whether errors (warnings, infos respectively) exist in the browser console. If any test case produced a console output with the specific priority level or higher, it will fail.
E.g. In a test suite with `expectNoWarnings(this)` used, all test cases will fail which produce either warning or error console outputs.
Note: It is recommended to reload the page before every test case (in beforeEach() callback function), as this is the safest way clearing the console (cross-browser).

#### Usage Example

```javascript
describe('my suite', function(){
    html5.consoleLogs.expectNoErrors(this);

    it('should test something, function(){
    
    });
});
```

### `consoleLogs(done)`

Returns a Promise Object that contains an array of console logs. Note that only messages logged with console.info(), console.warn() and console.error() will be retrieved.

```
html5.consoleLogs.consoleLogs(done);
```

#### Usage Example

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
    message: 'the severe error message',
    timestamp: 1432029414834,
    type: ''
}
```

Values of less than 900 are considered messages, and bigger or equal to 900 are errors.
