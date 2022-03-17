require('dotenv').config(); // in order to access the env variables
require('express-async-errors'); // so we don't have to set up our own async middleware
const express = require('express');
const app = express();

const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public')); // serving static file (front-end_)
app.use(express.json()); // post request to access request.body

app.use('/api/v1', mainRouter) // route endpoint

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
