import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListView({ exams }) {
  return (
    <ul className="divide-y divide-gray-100">
      {exams.map((exam, index) => (
        <li key={exam._id} className="py-5">
            {/* Patient ID as a separate link */}
            <div className="mb-2">
                <span className="text-gray-900 font-semibold">Patient ID: </span>
                <Link 
                    to={`/patient/${exam.patientId}`} 
                    className="text-blue-600 hover:text-blue-800"
                >
                    {exam.patientId}
                </Link>
            </div>
        
            {/* Main Exam Detail Link */}
            <Link to={`/exam/${exam._id}`} className="block hover:bg-gray-100 rounded-lg p-3">
                <div className="flex gap-x-4">
                    <img
                        className="h-12 w-12 bg-gray-50 rounded-lg object-cover object-center flex-none"
                        src={exam.imageURL}
                        alt=""
                    />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            Exam ID: {exam.examId}
                        </p>
                        <div className="mt-1 flex flex-col text-xs leading-5 text-gray-500">
                            <span>Age: {exam.age} - Sex: {exam.sex}</span>
                            <span>Zip Code: {exam.zipCode}</span>
                            <span>BMI: {exam.bmi}</span>
                            <span>Key Findings: {exam.keyFindings}</span>
                            <span>Brixia Scores: {exam.brixiaScores}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
      ))}
    </ul>
  );
}
