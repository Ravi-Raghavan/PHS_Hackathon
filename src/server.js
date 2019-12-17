var express = require('express');
var app = express();

app.get('/api/v1/resources/restaurants/user', function (req, res) {
  res.send('Hello World!'); // This will serve your request to '/'.
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
 });