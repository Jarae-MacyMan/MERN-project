//const Exam = require('../schema.js');
const express = require('express');
const router = express.Router();

const getPatients = async function (req, res) {

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
  const db = mongoose.connection;

  const patients = await Exam.find({}).distinct('patient_id');


  res.send(patients);

}

const getPatient = async function (req, res) {

  const patient_id = req.params.patient_id;

  const patient = await Exam.find({patient_id: req.params.patient_id});

  db.close();

  if (patient.length === 0) {
    res.status(404).send('Patient not found');
  }

  res.send(patient.map(exam => { return { ...exam._doc, _id: undefined }}));

}

const removePatient = async function (req, res) {
  
  const patient_id = req.params.patient_id;

  const patient = await Exam.findOne({patient_id: req.params.patient_id});

  if (!patient) {
    res.status(404).send('Patient not found');
    return;
  }

  const del = await Exam.deleteMany({patient_id: req.params.patient_id});

  if (del.deletedCount === 0) {
    res.status(404).send('Patient not found');
  } else {
    res.send('Patient deleted');
  }

}

router.get('/', getPatients);
router.get('/:patient_id', getPatient);
router.delete('/:patient_id', removePatient);

module.exports = router;