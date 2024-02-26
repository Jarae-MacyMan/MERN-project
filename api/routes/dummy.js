const express = require('express');
const router = express.Router();
const fs = require('fs');

const sleep = delayMs => new Promise(resolve => setTimeout(resolve, delayMs));

class Exam {

  patient_id;
  age;
  sex;
  zip;
  latest_bmi;
  latest_weight;
  png_filename;
  exam_id;
  icu_admit;
  number_icu_admits;
  mortality;

  constructor(data) {
    Object.assign(this, data);
  }

  static generateRandom(count = 1) {
    if (count > 1) return Array.from({ length: count }, Exam.generateRandom);
    const ptn_id = Math.floor(Math.random() * 10**12);
    const patient_id = `DUMMY-PATIENT-${ptn_id}`;
    return new Exam({
      patient_id: patient_id,
      age: Math.floor(Math.random() * (90 - 18 + 1) + 18),
      sex: Math.random() <= 0.01 ? 'O' : Math.random() <= 0.52 ? 'F' : 'M',
      zip: Math.floor(Math.random() * (799 - 700 + 1) + 700),
      latest_bmi: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)),
      latest_weight: Math.floor(Math.random() * (500 - 70 + 1) + 70),
      png_filename: `DUMMY-PATIENT-IMG-${ptn_id}-${Math.floor(Math.random() * 10)}.png`,
      exam_id: `Exam-${Math.floor(Math.random() * (10 - 1) + 1)}`,
      icu_admit: Math.random() <= 0.5,
      number_icu_admits: Math.floor(Math.random() * 5),
      mortality: Math.random() <= 0.5,
      _id: Math.floor(Math.random() * 16 ** 16).toString(16),
    });
  }
}

const CSVFile = './routes/data.csv';
var global_exam_data = [];

fs.readFileSync(CSVFile).toString().split('\n').forEach((line) => {
  const data = line.split(',');
  global_exam_data.push(new Exam({
    patient_id: data[0],
    age: data[1] ? Number(data[1]) : undefined,
    sex: data[2],
    zip: data[3] ? Number(data[3]) : undefined,
    latest_bmi: data[4] ? Number(data[4]) : undefined,
    latest_weight: data[5] ? Number(data[5]) : undefined,
    png_filename: data[6],
    exam_id: data[7],
    icu_admit: data[8] == 'Y',
    number_icu_admits: data[9] ? Number(data[9]) : undefined,
    mortality: data[10] == 'Y',
    _id: Math.floor(Math.random() * 16 ** 16).toString(16),
  }));
});

router.get('/exams/', async (req, res) => {
  const delay = parseInt(req.query.delay)
  if (delay && (isNaN(delay) || delay < 0 || delay > 10000)) {
    return res.status(400).send("Invalid delay parameter");
  }
  await sleep(delay);
  res.send(global_exam_data);
});

router.get('/exams/:exam_id/', async (req, res) => {
  const exam_id = req.params.exam_id;
  const delay = parseInt(req.query.delay)
  if (delay && (isNaN(delay) || delay < 0 || delay > 10000)) {
    return res.status(400).send("Invalid delay parameter");
  }
  if (!exam_id) return res.status(400).send("Missing exam_id parameter");
  await sleep(delay);
  const exams = global_exam_data.filter(e => e.exam_id === exam_id);
  res.send(exams);
});

router.get('/patients/', async (req, res) => {
  const delay = parseInt(req.query.delay);
  if (delay && (isNaN(delay) || delay < 0 || delay > 10000)) {
    return res.status(400).send("Invalid delay parameter");
  }
  await sleep(delay);
  const patients = [...new Set(global_exam_data.map(e => e.patient_id))];
  res.send(patients);
});

router.get('/patients/:patient_id/', async (req, res) => {
  const patient_id = req.params.patient_id;
  const delay = parseInt(req.query.delay)
  if (delay && (isNaN(delay) || delay < 0 || delay > 10000)) {
    return res.status(400).send("Invalid delay parameter");
  }
  if (!patient_id) return res.status(400).send("Missing patient_id parameter");
  await sleep(delay);
  const exams = global_exam_data.filter(e => e.patient_id === patient_id);
  if (exams.length === 0) {
    return res.status(404).send("Patient not found");
  }
  res.send(exams);
});

 router.post('/exams/', async (req, res) => { 
  const delay = parseInt(req.query.delay);
  if (delay && (isNaN(delay) || delay < 0 || delay > 10000)) {
    return res.status(400).send("Invalid delay parameter");
  }
  await sleep(delay);
  const exam = new Exam({
    ...req.body,
    _id: Math.floor(Math.random() * 16 ** 16).toString(16),
  });
  global_exam_data.push(exam);
  res.send(exam);
});

module.exports = router;
