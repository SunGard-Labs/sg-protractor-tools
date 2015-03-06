exports.config = {

  // Spec patterns are relative to the location of this config.
  specs: [
    'test/html5-spec.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['lang=en-GB',  'enable-precise-memory-info' , 'js-flags=--expose-gc']}
  },

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9000/?appStage=T',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  }
};
