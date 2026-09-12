require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const mongodb = require('./data/database');

const port = process.env.PORT || 3000;
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts.'
    }
  },
  apis: ['./routes/*.js']
});

//Import and use the router midleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const routes = require('./routes');
app.use('/', routes);
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