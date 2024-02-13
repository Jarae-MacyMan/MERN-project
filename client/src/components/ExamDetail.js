// ExamDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExamsContext } from './ExamsProvider';
import { Link } from 'react-router-dom';

const ExamDetail = () => {
  const { examId } = useParams();
  const { currentExam, loadExam } = useContext(ExamsContext);
  const [loading, setLoading] = useState(true);

  //COMMENT FEATURE
  const [comment, setComment] = useState(''); // State to hold the current comment
  const [comments, setComments] = useState([]); // State to hold all comments

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const newComment = `${formattedDate}: ${comment}`;
      setComments([...comments, newComment]);
      setComment(''); // Clear the comment input after submission
    }
  };

  // END OF COMMENT FEATURE

  useEffect(() => {
    const fetchExam = async () => {
      await loadExam(examId);
      setLoading(false);
    };
    fetchExam();
  }, [examId]);

  // If exam is still loading, it will be null so we need to check for that
  var exam = null;
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  else {
    exam = currentExam.exam;
  }

  if (!exam) {
    return <div className="flex justify-center items-center h-screen">Exam not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6">
        {/* Patient Information Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>
          <img className="w-full h-48 object-contain rounded-md mb-4" src={exam.imageURL} alt="Exam" />
          <p className="text-lg mb-2"><strong>ID:</strong> {exam._id}</p>
          <p className="text-lg mb-2"><strong>Exam ID:</strong> {exam.examId}</p>
          <p className="text-lg mb-2"><strong>Patient ID:</strong> {exam.patientId}</p>
          <p className="text-lg mb-2"><strong>Age:</strong> {exam.age}</p>
          <p className="text-lg mb-2"><strong>Sex:</strong> {exam.sex}</p>
          <p className="text-lg mb-2"><strong>Zip Code:</strong> {exam.zipCode}</p>
          <p className="text-lg mb-2"><strong>BMI:</strong> {exam.bmi}</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">Return to Home</Link>
        </div>
  
        {/* Medical Analysis Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Medical Analysis</h2>
          <p className="text-lg mb-2"><strong>Key Findings:</strong> {exam.keyFindings}</p>
          <p className="text-lg"><strong>Brixia Scores:</strong> {exam.brixiaScores}</p>
          {/* Additional analysis data can go here */}
          
                  {/* Display Comments */}
        {comments.map((cmt, index) => (
          <p key={index} className="text-sm mt-2">{cmt}</p>
        ))}

        {/* Comment Feature */}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Comment</button>
        </form>

        </div>
      </div>
  
      {/* Additional Dashboard Features */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Additional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Medical History */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Medical History</h3>
            {/* Content */}
          </div>
  
          {/* Feature 2: Treatment Plan */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Treatment Plan</h3>
            {/* Content */}
          </div>
  
          {/* Feature 3: Appointment Scheduling */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
            {/* Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
