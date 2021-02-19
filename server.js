const express = require('express');

//set up port for application.
const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Pull in routes from burgers_controller.js file. 
const routes = require('./controllers/burgers_controller.js');

app.use(routes);

//start port to listen when server.js is run by user. 
app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);
