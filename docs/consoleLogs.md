# HTML5 Protractor Tools Documentation - Console Logs

## Functions

### `consoleLogs(done)`

Returns a Promise Object that contains an array of console logs.

```
html5.consoleLogs.consoleLogs(done);
```

## Usage Example

```javascript
 afterEach(function (done) {
        var consoleLogPromise = sgpt.consoleLogs.consoleLogs(done);
        consoleLogPromise.then(function (browserLogs) {
           browserLogs.forEach(function(log){
                  expect(log.level.value > 900).toBeFalsy();
               });
           };
        });
 });
```
Notes:
1. The done function is passed to the consoleLogs(done). The done function is called by the consoleLog function when
the logs have been populated. While it is not necessary to pass a done function, it solves synchronization issues in some tests.
2. The browserLogs array contains a log object for each line in the logs. The log object contains the following attributes:

```javascript
    { level: { value: 1000, name: 'SEVERE' },
    message: 'the severe errror message', timestamp: 1432029414834, type: '' } ]
```
Values of less than 900  are considered messages, and bigger or equal to 900 are errors.
