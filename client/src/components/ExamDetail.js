// ExamDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExamsContext } from './ExamsProvider';
import { Link } from 'react-router-dom';

const ExamDetail = () => {
  const { examId } = useParams();
  const { exams, loadExam } = useContext(ExamsContext);
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      await loadExam(examId);
      setLoading(false);
    };

    fetchExam();
  }, [examId, loadExam]);

  useEffect(() => {
    const foundExam = exams.find(e => e?._id === examId);
    if (foundExam) {
      setExam(foundExam);
    }
  }, [exams, examId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!exam) {
    return <div className="flex justify-center items-center h-screen">Exam not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 shadow-lg rounded-lg mt-10 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Exam Detail</h1>
      <img className="w-full h-auto object-contain rounded-md mb-4" src={exam.imageURL} alt="Exam" />
      <p className="text-lg mb-2"><strong>ID:</strong> {exam._id}</p>
      <p className="text-lg mb-2"><strong>Exam ID:</strong> {exam.examId}</p>
      <p className="text-lg mb-2"><strong>Patient ID:</strong> {exam.patientId}</p>
      <p className="text-lg mb-2"><strong>Age:</strong> {exam.age}</p>
      <p className="text-lg mb-2"><strong>Sex:</strong> {exam.sex}</p>
      <p className="text-lg mb-2"><strong>Zip Code:</strong> {exam.zipCode}</p>
      <p className="text-lg mb-2"><strong>BMI:</strong> {exam.bmi}</p>
      <p className="text-lg mb-2"><strong>Key Findings:</strong> {exam.keyFindings}</p>
      <p className="text-lg"><strong>Brixia Scores:</strong> {exam.brixiaScores}</p>
      <Link to="/" className="text-blue-600 hover:text-blue-800">Return to Home</Link> {/* Return link */}
    </div>
  );
};

export default ExamDetail;
