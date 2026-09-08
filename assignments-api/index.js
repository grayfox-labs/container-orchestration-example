const express = require('express');

// Extract environment variables and assign default values if not provided
const {
  EXPRESS_PORT = 3000,
} = process.env;

// Create an Express instance
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start Express and listen on the specified port
app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});
