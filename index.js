const express = require('express');
const app = express();
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: 'YOUR SEVER SIDE ACCESS TOKEN',
  captureUncaught: true,
  verbose: true,
  captureUnhandledRejections: true
});

function DogButtError(message) {
  this.name = 'DogButtError';
  this.message = (message || '');
  }
};
DogButtError.prototype = Error.prototype;

app.use(rollbar.errorHandler());

app.get('/', function (req, res) {
  res.send('Hello World!');
  rollbar.info('Hello world page is showing');
});

app.get('/ruby', function (req, res) {
  res.send('ruby!')
  try {
    rubyIsADogNotAnError();
  } catch (e) {
    rollbar.error(e, req);
  }
});

app.get('/zero', function (req, res) {
  res.send('zero!')
  try {
    throw new ValueError('zero?');
  } catch (e) {
    rollbar.error(e, req);
  }
});

app.get('/custom_error', function(req, res) {
  res.send('custom_error')
  try {
    throw new DogButtError('oh shoot');
  } catch (e) {
    console.log(e);
    rollbar.error(e);
  }
});


app.listen(3000, function () {
  console.log('app listening on port 3000!')
});
