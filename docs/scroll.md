# HTML5 Protractor Tools Documentation - Scroll

## Functions

### `scrollTo(scrollToElement)`

Scrolls the current page to the specified element's vertical position. Returns a promise from the browser driver's executeScript function that will be resolved when the command has completed.

```
html5.scroll.scrollTo(element(by.css("div[sg-unique-id-seed='grid_6']")));
```
