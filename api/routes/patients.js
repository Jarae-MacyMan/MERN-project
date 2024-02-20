const express = require('express');
const router = express.Router();

const { getPatients, getPatient, removePatient } = require('../controllers/patient-controller.js');

router.get('/', getPatients);
router.get('/:patient_id', getPatient);
router.delete('/:patient_id', removePatient);

module.exports = router;
