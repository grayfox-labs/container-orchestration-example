const express = require('express');
const mongoose = require('mongoose');
const Assignment = require('./database/Assignment');

// Extract environment variables and assign default values if not provided
const {
  EXPRESS_PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017'
} = process.env;

// Create an Express instance
const app = express();

// Returns all assignments
app.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Returns a single assignment by ID
app.get('/assignments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  // Once connected...
  .then(async () => {
    console.log('Connected to MongoDB');

    const assignments = await Assignment.find();

    if (assignments.length === 0) {
      console.log('No assignments found, adding default assignments');
      const defaultAssignments = [
        {
          title: 'Midterm',
          description: 'Write a program that takes two numbers as command line inputs and returns their sum',
          dueDate: (new Date()).setMonth(9, 15),
        },
        {
          title: 'Final',
          description: 'Write a convolutional neural network for identifying numbers from handwriting',
          dueDate: (new Date()).setMonth(11, 8),
        }
      ];

      Assignment.insertMany(defaultAssignments)
        .then(() => console.log('Default assignments added'))
        .catch(err => console.error('Failed to add default assignments', err));
    }

    // Start Express and listen on the specified port
    app.listen(EXPRESS_PORT, () => {
      console.log(`Server is running on port ${EXPRESS_PORT}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

