const port = 8000;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Dependencies */
const cors = require("cors");
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`server is runing on port:${port}`);
});

// Initialize all route with a callback function
app.get("/all", sendAll);

// Callback function to complete GET '/all'
function sendAll(req, res) {
  res.send(projectData);
}

// Post Route
app.post("/post", (req, res) => {
  let data = req.body;
  projectData = {
    temp: data.temp,
    date: data.date,
    content: data.content,
  };
  res.send(projectData);
});
