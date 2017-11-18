const express = require('express');
var Rollbar = require('rollbar');

const app = express();

var rollbar = new Rollbar({
  accessToken: 'f965aa354abd4ee0b3b27577cd093dda',
  captureUncaught: true,
  verbose: true,
  captureUnhandledRejections: true
});

rollbar.log('Hello there! You\'ve started the app');

// throw new Error('error outside app.get');

//default endpoint

app.get('/', function (req, res) {
  console.log('in the working app.get')
  rollbar.log('no error here');
});

app.get('/inside', function (req, res) {
  rollbar.log('error about to be thrown from INSIDE THE APP.GET');
  throw new Error('eek the error is happening inside the app.get!');
});

app.use(rollbar.errorHandler());

app.listen(3000, function() {
  console.log('aw my app actually listens :)');
});
