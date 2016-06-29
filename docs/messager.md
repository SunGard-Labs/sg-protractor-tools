# SunGard Protractor Tools Documentation - Messager

Allows protractor tests to display narrative messages to people watching the tests.
This allows tests to be made more interactive as they can now explain in detail what is going on.
NOTE: This tool is specifically built to run in protractor tests.

## Functions
### `msg(browser,message[,error][,msgDelay][,pauseOnError])`
### `repositionMessager(position)`
### `logErrors(browser,msgFunction[,pauseOnError][,stillOutputToLog])`

## Constants (For use with the repositionMessager function)
TOP_LEFT
TOP_RIGHT
BOTTOM_LEFT
BOTTOM_RIGHT

## Reference
```
browser - variable available inside protractor tests
message - message string to be displayed
error - boolean telling whether this message is an error message or normal message
msgDelay - time in milliseconds that each message is displayed for, default is 2000ms
pauseOnError - if you have the logErrors function inside your afterEach, setting this to true will tell the debugger to pause when an exception is thrown
position - position to display the messager at (see constants below)
msgFunction - this refers to the fispt.messager.msg function, which needs to be passed into the logErrors function
stillOutputToLog - setting this to true tells the app to log the console exceptions into the command console as well
fispt - SunGard Protractor Tools (the name of our tools package)
```

## Usage Examples
```
fispt.messager.msg(browser,'Howdy');
fispt.messager.msg(browser,'Howdy',false,3000,true);

beforeEach(function () {
	fispt.messager.repositionMessager(fispt.messager.TOP_RIGHT);
	// OR
	fispt.messager.repositionMessager(fispt.messager.BOTTOM_LEFT);
});	

// You need to add the following to the afterEach to benefit from the special error logging functionality
afterEach(function() {
	fispt.messager.logErrors(browser,fispt.messager.msg);
});
```
