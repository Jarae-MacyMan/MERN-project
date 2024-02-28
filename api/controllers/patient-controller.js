const Exam = require('../models/exam-model');

const getPatients = async function (_req, res) {

  const patients = await Exam.find({}).distinct('patient_id');

  res.send(patients);

}

const getPatient = async function (req, res) {

  const patient_id = req.params.patient_id;

  try {
      const examData = await Exam.find({patient_id});
      if (!examData) {
          return res.status(404).json({ success: false, error: 'Exam not found' });
      }
      return res.status(200).json({
          success: true,
          exam: examData
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          error: error.message
      });
  }
};

const removePatient = async function (req, res) {
  
  const patient_id = req.params.patient_id;

  const patient = await Exam.findOne({patient_id});

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

module.exports = {
    getPatients,
    getPatient,
    removePatient
}
