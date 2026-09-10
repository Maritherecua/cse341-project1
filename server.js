require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./data/database');

const port = process.env.PORT || 3000;

//Import and use the router midleware
const routes = require('./routes');
app.use('/', routes);
app.use(bodyParser.json());
//Initialize the database and start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is listening and running on port ${port}`);
  
   });
  }
});