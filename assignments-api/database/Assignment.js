const { Schema, model } = require('mongoose');

const assignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true }
});

const Assignment = model('Assignment', assignmentSchema);

module.exports = Assignment;
