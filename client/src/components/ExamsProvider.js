// ExamsProvider.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import Homescreen from './Homescreen';

// Create context
export const ExamsContext = createContext();
const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchExams = async (examId, patientId) => {
    try {
        // Construct the URL based on whether an examId/PatientID is provided
        let url = `${baseUrl}/exams/`;
        console.log("URL:", url);
        if (examId) {
            url = `${baseUrl}/exams/${examId}/`;
        } else if (patientId) {
            url = `${baseUrl}/patients/${patientId}/`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch exams:", error);
        return []; // Return an empty array or handle the error as needed
    }
}

export const ExamsProvider = ({ children }) => {
    const [allExams, setAllExams] = useState([]);
    const [currentExam, setCurrentExam] = useState(null);

    // Function to load a specific exam
    const loadExam = useCallback(async (examId) => {
        const examData = await fetchExams(examId);
        const exam = examData.exam;
        if (examData && examData.success) {
            const formattedData = {
                _id: exam._id,
                exam_id: exam.exam_id, 
                patient_id: exam.patient_id, 
                age: exam.age,
                sex: exam.sex,
                zip: exam.zip, 
                latest_bmi: exam.latest_bmi, 
                latest_weight: exam.latest_weight, 
                png_filename: exam.png_filename, 
                icu_admit: exam.icu_admit, 
                number_icu_admits: exam.number_icu_admits, 
                mortality: exam.mortality 
            };
            setCurrentExam(formattedData || null);
            }
        else {
            console.log("Invalid or empty data received:", examData);
            setCurrentExam(null);
        }
    }, [fetchExams, setCurrentExam]); 

    // Function to load exams by patient ID
    const loadExamsByPatientId = useCallback(async (patientId) => {
        const examData = await fetchExams(null, patientId)
        if (examData && examData.success && Array.isArray(examData.exam)) {
            const formattedData = examData.exam
                .filter(exam => exam != null)
                .map(exam => ({
                    _id: exam._id,
                    exam_id: exam.exam_id, 
                    patient_id: exam.patient_id, 
                    age: exam.age,
                    sex: exam.sex,
                    zip: exam.zip, 
                    latest_bmi: exam.latest_bmi, 
                    latest_weight: exam.latest_weight, 
                    png_filename: exam.png_filename, 
                    icu_admit: exam.icu_admit, 
                    number_icu_admits: exam.number_icu_admits, 
                    mortality: exam.mortality 
                }));
            setCurrentExam(formattedData || []);
            }
        else {
            console.log("Invalid or empty data received:", examData);
            setCurrentExam([]);
        }
    }, []);

    useEffect(() => {
        fetchExams().then((data) => {
            if (data && data.success && Array.isArray(data.exam)) {
                const formattedData = data.exam
                  .filter(exam => exam != null)
                  .map(exam => ({
                        _id: exam._id,
                        exam_id: exam.exam_id, 
                        patient_id: exam.patient_id, 
                        age: exam.age,
                        sex: exam.sex,
                        zip: exam.zip, 
                        latest_bmi: exam.latest_bmi, 
                        latest_weight: exam.latest_weight, 
                        png_filename: exam.png_filename, 
                        icu_admit: exam.icu_admit, 
                        number_icu_admits: exam.number_icu_admits, 
                        mortality: exam.mortality 
                  }));
                setAllExams(formattedData);
            } else {
                console.log("Invalid or empty data received:", data);
                setAllExams([]);
            }
        });
    }, []);

    return (
        <ExamsContext.Provider value={{ allExams, currentExam, loadExam, loadExamsByPatientId, fetchExams }}>
            {children}
        </ExamsContext.Provider>
    );
};
