import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, redirect } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListView({ exams, isAdmin }) {
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

        // Refresh the page
        window.location.reload();
      }
      catch (error) {
        console.error("Error during fetch:", error);
      }
    }
  };


  return (
    <ul className="divide-y divide-gray-100">
      {exams.map((exam) => (
        <li key={exam._id} className="flex justify-between items-center py-5">
    
          <Link to={`/exam/${exam._id}`} className="flex items-center hover:bg-gray-100 rounded-lg p-3 flex-grow gap-x-2">
            <img
              className="max-h-12 max-w-12 bg-gray-50 rounded-lg object-cover object-center flex-none"
              src={`/images/${exam.png_filename}`}
              alt="Image"
            />
            <div className="min-w-0 flex-auto">
              <span className="text-sm font-semibold leading-6 text-gray-900">Patient ID: </span>
                <Link 
                    to={`/patient/${exam.patient_id}`} 
                    className="text-blue-600 hover:text-blue-800"
                >
                    {exam.patient_id}
                </Link>
              <div className="mt-1 flex flex-col text-xs leading-5 text-gray-500">
                <span>Exam ID: {exam.exam_id}</span>
                <span>Age: {exam.age} - Sex: {exam.sex}</span>
                <span>Zip Code: {exam.zip}</span>
                <span>BMI: {exam.latest_bmi}</span>
                <span>Weight: {exam.latest_weight}</span>
                <span>ICU Admit: {exam.icu_admit === 1 ? 'True' : 'False'}</span>
                <span>Number ICU Admits: {exam.number_icu_admits}</span>
                <span>Mortality: {exam.mortality ? 'True' : 'False'}</span>
              </div>
            </div>
          </Link>
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <Link
                to={`/exam/${exam._id}/edit`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(exam._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
