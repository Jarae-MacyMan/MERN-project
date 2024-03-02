// ExamDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExamsContext } from './ExamsProvider';
import { Link } from 'react-router-dom';
import { AdminProvider, useAdmin } from './AdminContext';
import EditableFieldsForm from './EditableFieldsForm';
import ImageModal from './ImageModal';

const baseUrl = process.env.REACT_APP_BASE_URL;

const ExamDetail = (props) => {
  const { examId } = useParams();
  const { currentExam, loadExam } = useContext(ExamsContext);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAdmin();
  const [editMode, setEditMode] = useState(props.editMode || false);
  const [formData, setFormData] = useState({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
  }, [loadExam, examId]);

  useEffect(() => {
    // Check if editMode is true and data is loaded, then set the formData
    if (editMode && currentExam) {
      setFormData(currentExam);
    }
  }, [editMode, currentExam]);

  // If exam is still loading, it will be null so we need to check for that
  var exam = null;
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  else {
    exam = currentExam;
  }
  if (!exam) {
    return <div className="flex justify-center items-center h-screen">Exam not found.</div>;
  }

  // Set redirect to home view by default
  var redirect = "/";

  if (isAdmin) {
    // Set redirect to admin view
    redirect = "/admin";
  }

  const handleImageClick = () => {
    setIsImageModalOpen(!isImageModalOpen);
  };

  const toggleEditMode = () => {
    if (editMode) {
      setEditMode(false);
    }
    else {
      setEditMode(true);
      setFormData(exam);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //handle numbers in age and bmi
    if (e.target.name === "age" || e.target.name === "bmi") {
      setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    }
  }
  
  const handleSubmit = async () => {
    try {
        const response = await fetch(`${baseUrl}/exams/${examId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedExam = await response.json();

        // Call loadExam again to refresh the data
        await loadExam(examId);
        setEditMode(false);
    }
    catch (error) {
        console.error("Error during fetch:", error);
    }
  };

  const handleDelete = async (examId) => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        // Delete the exam asynchronously
        const response = await fetch(`${baseUrl}/exams/${examId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Navigate to the home page
        window.location.href = "/";
      }
      catch (error) {
        console.error("Error during fetch:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6">
        {/* Patient Information Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>

          {editMode ? (
            <EditableFieldsForm
              exam={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <>
              <div onClick={handleImageClick} className="cursor-pointer">
                <img className="w-full h-48 object-contain rounded-md mb-4 cursor-pointer" src={`/images/${exam.png_filename}`} alt="Exam" />
              </div>
                {/* Image Modal */}
                {isImageModalOpen && (
                  <ImageModal
                    src={`/images/${exam.png_filename}`}
                    alt="Exam"
                    onClose={() => setIsImageModalOpen(false)}
                  />
                )}
              <p className="text-lg mb-2"><strong>ID:</strong> {exam.exam_id}</p>
              <p className="text-lg mb-2"><strong>Exam ID:</strong> {exam.exam_id}</p>
              <p className="text-lg mb-2"><strong>Patient ID:</strong> {exam.patient_id}</p>
              <p className="text-lg mb-2"><strong>Age:</strong> {exam.age}</p>
              <p className="text-lg mb-2"><strong>Sex:</strong> {exam.sex}</p>
              <p className="text-lg mb-2"><strong>Zip Code:</strong> {exam.zip}</p>
              <p className="text-lg mb-2"><strong>BMI:</strong> {exam.latest_bmi}</p>
              <p className="text-lg mb-2"><strong>Weight:</strong> {exam.latest_weight}</p>
            </>
          )}

          <div className="mt-4">
            <Link 
                to={redirect}  
                className="text-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Return to Home
            </Link>

            {isAdmin && (
              <>
               {editMode && (
                  <button 
                      onClick={handleSubmit}
                      className="ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                  >
                      Save Changes
                  </button>   
                )}
                <button 
                    onClick={toggleEditMode}
                    className={`ml-2 bg-${editMode ? 'red' : 'green'}-500 text-white font-bold py-2 px-4 rounded hover:bg-${editMode ? 'red' : 'green'}-700`}
                >
                    {editMode ? 'Cancel Edit' : 'Edit'}
                </button>
                {!editMode && (
                  <button 
                      onClick={() => handleDelete(exam._id)}  
                      className="ml-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                  >
                      Delete Exam
                  </button>
                )}
              </>
            )}
          </div>
        </div>
  
        {/* Medical Analysis Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Medical Analysis</h2>
          {editMode ? null : (
            <>
              <p className="text-lg mb-2"><strong>ICU Admit:</strong> {exam.icu_admit ? 'Yes' : 'No'}</p>
              <p className="text-lg mb-2"><strong>Number of ICU Admits:</strong> {exam.number_icu_admits}</p>
              <p className="text-lg mb-2"><strong>Mortality:</strong> {exam.mortality ? 'Yes' : 'No'}</p>
            </>
          )}
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
    </div>
  );
};

export default ExamDetail;

