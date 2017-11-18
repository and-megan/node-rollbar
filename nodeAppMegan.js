const express = require('express');
const app = express();
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: '63db8f8b9b4d40f49d7d6abf700ec498',
  captureUncaught: true,
  verbose: true,
  captureUnhandledRejections: true
});

// log a generic message and send to rollbar
// rollbar.log('Hello local server world!');
// rollbar.error('Error time no request', {'custom_1': 'custom_key'});
// try {
//   rubyisnotanerror();
// } catch (err) {
//   rollbar.error(err, {'custom_2': 'custom_key_2'})
// }
app.use(rollbar.errorHandler());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/ruby', function (req, res) {
  res.send('ruby!')
  try {
    rubyIsADogNotAnError();
  } catch (e) {
    rollbar.error(e, req);
  }

})

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
