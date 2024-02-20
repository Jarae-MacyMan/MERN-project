import React from 'react';

const EditableFieldsForm = ({ exam, handleChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="examId" className="block text-sm font-medium text-gray-700">Exam ID</label>
        <input
          type="text"
          name="examId"
          id="examId"
          value={exam.examId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          name="imageURL"
          id="imageURL"
          value={exam.imageURL}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={exam.age}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          step="1"
          required
        />
      </div>
      <div>
        <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
        <input
          type="text"
          name="sex"
          id="sex"
          value={exam.sex}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="text"
          name="zipCode"
          id="zipCode"
          value={exam.zipCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">BMI</label>
        <input
          type="number"
          step="any"
          name="bmi"
          id="bmi"
          value={exam.bmi}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="keyFindings" className="block text-sm font-medium text-gray-700">Key Findings</label>
        <textarea
          name="keyFindings"
          id="keyFindings"
          rows="3"
          value={exam.keyFindings}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="brixiaScores" className="block text-sm font-medium text-gray-700">Brixia Scores</label>
        <input
          type="text"
          name="brixiaScores"
          id="brixiaScores"
          value={exam.brixiaScores}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
    </form>
  );
};

export default EditableFieldsForm;