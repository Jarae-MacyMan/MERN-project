const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  patient_id: String,
  age: Number,
  sex: String,
  zip: String,
  latest_bmi: Number,
  latest_weight: Number,
  png_filename: String,
  exam_id: String,
  icu_admit: Boolean,
  number_icu_admits: Number,
  mortality: Boolean,
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
