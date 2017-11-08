require('./config/config');
const path = require('path');
const express = require('express');

const port = process.env.PORT;

var app = express();

app.use(express.static(path.join(__dirname,'../public')))


app.listen(port,() => {
  console.log(`Server is ready on port ${port}`);
});

module.exports = {app};
