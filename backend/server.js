// Import the 'http' module, which provides functionality to create an HTTP server.
const http = require('http');

// Import the custom 'rest.js' module, which contains the Express application code.
const express = require('./rest.js');

// Create an HTTP server using the Express application ('express').
const server = http.createServer(express);

// Start the server and make it listen on port 3000 for incoming requests.
server.listen(3000);
