const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = new express();
const routes = require('./routes/index');
const cors = require('cors');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);



const port = process.env.PORT || 3001;
app.listen(port);
console.log('Server listening on:', port);
