const express = require('express');
const app = express();
const port = 3000;

// setup the Express middleware
require('./server/middleware/middleware')(app);

// setup the api
require('./server/api')(app);

app.listen(port, () => {
  console.log(('running server on port ' + port));
});

module.exports = app;
