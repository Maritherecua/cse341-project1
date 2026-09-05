require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
//Import and use the router midleware
const routes = require('./routes');
app.use('/api', routes);
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is listening and running on port ${port}`);
    });
  }
});