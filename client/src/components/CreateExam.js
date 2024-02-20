import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExam = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    age: '',
    sex: '',
    bmi: '',
    zipCode: '',
    examId: '',
    imageURL: '',
    keyFindings: '',
    brixiaScores: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create exam goes here
    console.log(formData); // Replace with actual API call
    navigate('/'); // Redirect after creation
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-10 rounded">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Create New Exam</h2>
        <div>
            <div>
                <label htmlFor="patientId" class="block text-sm font-medium text-gray-700">Patient ID</label>
                <input
                type="text"
                name="patientId"
                id="patientId"
                value={formData.patientId}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="examId" class="block text-sm font-medium text-gray-700">Exam ID</label>
                <input
                type="text"
                name="examId"
                id="examId"
                value={formData.examId}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="imageURL" class="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                type="text"
                name="imageURL"
                id="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="age" class="block text-sm font-medium text-gray-700">Age</label>
                <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="sex" class="block text-sm font-medium text-gray-700">Sex</label>
                <input
                type="text"
                name="sex"
                id="sex"
                value={formData.sex}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="zipCode" class="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="bmi" class="block text-sm font-medium text-gray-700">BMI</label>
                <input
                type="number"
                step="any"
                name="bmi"
                id="bmi"
                value={formData.bmi}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="keyFindings" class="block text-sm font-medium text-gray-700">Key Findings</label>
                <textarea
                name="keyFindings"
                id="keyFindings"
                rows="3"
                value={formData.keyFindings}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                ></textarea>
            </div>

            <div>
                <label htmlFor="brixiaScores" class="block text-sm font-medium text-gray-700">Brixia Scores</label>
                <input
                type="text"
                name="brixiaScores"
                id="brixiaScores"
                value={formData.brixiaScores}
                onChange={handleChange}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                />
            </div>
            </div>

            <div class="col-span-2">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create Exam
            </button>
            <div class="h-4"></div>
            <button type="button" onClick={() => navigate('/admin')} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            </div>
      </form>
    </div>
  );
};

export default CreateExam;
