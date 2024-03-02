import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamsContext } from './ExamsProvider';

const CreateExam = () => {
  const [formData, setFormData] = useState({
    patient_id: '',
    exam_id: '',
    png_filename: '',
    age: '',
    sex: '',
    zip: '',
    latest_bmi: '',
    latest_weight: '',
    icu_admit: 0,
    number_icu_admits: '',
    mortality: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/exams/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/');
      } else {
        // Handle errors
        console.error('Failed to create exam:', response.status);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-10 rounded">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Create New Exam</h2>
        <div>
            <div>
                <label htmlFor="patient_id" className="block text-sm font-medium text-gray-700">Patient ID</label>
                <input
                type="text"
                name="patient_id"
                id="patient_id"
                defaultValue={formData.patient_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="exam_id" className="block text-sm font-medium text-gray-700">Exam ID</label>
                <input
                type="text"
                name="exam_id"
                id="exam_id"
                defaultValue={formData.exam_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="png_filename" className="block text-sm font-medium text-gray-700">Image File Name</label>
                <input
                type="text"
                name="png_filename"
                id="png_filename"
                defaultValue={formData.png_filename}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <input
                type="number"
                name="age"
                id="age"
                defaultValue={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
                <select
                type="text"
                name="sex"
                id="sex"
                defaultValue={formData.sex}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                >
                  {formData.sex ? null : <option/>}
                  <option>M</option>
                  <option>F</option>
                </select>
            </div>

            <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                type="text"
                name="zip"
                id="zip"
                defaultValue={formData.zip}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="latest_bmi" className="block text-sm font-medium text-gray-700">BMI</label>
                <input
                type="number"
                name="latest_bmi"
                id="latest_bmi"
                defaultValue={formData.latest_bmi}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="latest_weight" className="block text-sm font-medium text-gray-700">Weight</label>
                <input
                type="number"
                name="latest_weight"
                id="latest_weight"
                defaultValue={formData.latest_weight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="icu_admit" className="block text-sm font-medium text-gray-700">ICU Admit</label>
                <select
                    name="icu_admit"
                    id="icu_admit"
                    defaultValue={formData.icu_admit}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                    required
                >
                    <option value="0">False</option>
                    <option value="1">True</option>
                </select>
            </div>

            <div>
                <label htmlFor="number_icu_admits" className="block text-sm font-medium text-gray-700">Number of ICU Admits</label>
                <input
                type="number"
                name="number_icu_admits"
                id="number_icu_admits"
                defaultValue={formData.number_icu_admits}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                required
                />
            </div>

            <div>
                <label htmlFor="mortality" className="block text-sm font-medium text-gray-700">Mortality</label>
                <select
                    name="mortality"
                    id="mortality"
                    defaultValue={formData.mortality}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
                    required
                >
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>

            </div>

            <div className="col-span-2">
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create Exam
            </button>
            <div className="h-4"></div>
            <button type="button" onClick={() => navigate('/admin')} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            </div>
      </form>
    </div>
  );
};

export default CreateExam;
