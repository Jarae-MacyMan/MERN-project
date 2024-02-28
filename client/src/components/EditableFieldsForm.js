import React from 'react';

const EditableFieldsForm = ({ exam, handleChange }) => {
  return (
    <form>
      <div>
          <label htmlFor="exam_id" className="block text-sm font-medium text-gray-700">Exam ID</label>
          <input
          type="text"
          name="exam_id"
          id="exam_id"
          defaultValue={exam.exam_id}
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
          defaultValue={exam.png_filename}
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
          defaultValue={exam.age}
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
          defaultValue={exam.sex}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
          >
            {exam.sex ? null : <option/>}
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
          defaultValue={exam.zip}
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
          defaultValue={exam.latest_bmi}
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
          defaultValue={exam.latest_weight}
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
              defaultValue={exam.icu_admit}
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
          defaultValue={exam.number_icu_admits}
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
              defaultValue={exam.mortality}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-600 focus:ring-opacity-50"
              required
          >
              <option value="false">False</option>
              <option value="true">True</option>
          </select>
      </div>
    </form>
  );
};

export default EditableFieldsForm;