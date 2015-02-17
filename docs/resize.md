# HTML5 Protractor Tools Documentation - Resize

The resize module offers convenience functions for resizing the browser window and adjusting the viewport.

## Functions

### `setWindowSize(width, height)`

Resizes the browser window to given width and height. Returns a promise that will be resolved when the command has completed.

```
html5.resize.setWindowSize(1024, 600);
```

### `getWindowSize()`

Get the current browser window size. Returns a promise that will be resolved with the window's size in the form of a `{width:number, height:number}` object literal.

```
html5.resize.getWindowSize().then(function(sizes){

});
```

### `setViewportSize(width, height)`

Resizes the browser window to achieve a given width and height for the viewport.
Due to UI elements on the browser window (menu bar, tab bar, address input, ...) the viewport is smaller than the browser window. The actual space occupied by browser UI elements varies, thus setting the same window size in different environments may result in different viewport sizes.

Returns a promise that will be resolved when the command has completed.

```
html5.resize.setViewportSize(1200, 720);
```

### `getViewportSize()`

Get the current viewport size. Returns a promise that will be resolved with the viewport's size in the form of a `{width:number, height:number}` object literal.

```
html5.resize.getViewportSize().then(function(size){

});
```

### `reset()`

Resets the browser viewport to default size that is used for testing. Should be used at the end of tests that change the browser or viewport size to avoid side effects to upcoming tests.

The default size is _1200x700_.

```
it('should test', function(){
  // ...
  this.after(html5.resize.reset);
  // ...
});
```

```
it('should test', function(){
  // ...
  html5.resize.reset();
});
```

### `setDefaultSize(width, height)`

Changes the default size to the specified values. Default size is _1200x700_.

```
html5.resize.setDefaultSize(1024, 768);
```
