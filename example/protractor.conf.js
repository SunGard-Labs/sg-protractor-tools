exports.config = {

  // Spec patterns are relative to the location of this config.
  specs: [
    'test/e2e/**/*.spec'
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['lang=en-GB',  'enable-precise-memory-info' , 'js-flags=--expose-gc', 'no-sandbox']}
  },

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9000/',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  }
};

if (process.env.TRAVIS) {
	exports.config.capabilities.chromeOptions.binary = __dirname + '/../chrome-linux/chrome';
}
