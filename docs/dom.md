# HTML5 Protractor Tools Documentation - DOM

## Functions

### `waitForDisplayed(element, [timeout])`

Makes the test execution wait for the specified `element` to be displayed. Use this instead of resorting to `sleep()`. Returns a promise that will be resolved when the command has completed.

The default wait time is 1000 ms. This can be adjusted with the optional parameter `timeout`.

```
html5.dom.waitForDisplayed(element(by.css('div[...]')), 500);
```

### `waitForNotDisplayed(element, [timeout])`

Makes the test execution wait for the specified `element` to be no longer displayed. Returns a promise that will be resolved when the command has completed.

The default wait time is 1000 ms. This can be adjusted with the optional parameter `timeout`.

```
html5.dom.waitForNotDisplayed(element(by.css('div[...]')), 2000);
```
