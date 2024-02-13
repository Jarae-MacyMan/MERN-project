// ExamsProvider.js
import React, { createContext, useState, useEffect } from 'react';

// Create context
export const ExamsContext = createContext();

const fetchExams = async (examId) => {
    try {
        // Construct the URL based on whether an examId is provided
        const url = examId 
            ? `https://czi-covid-lypkrzry4q-uc.a.run.app/api/exam/${examId}/`
            : "https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams/";

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
    const [exams, setExams] = useState([]);

    // Function to load a specific exam
    const loadExam = async (examId) => {
        const examData = await fetchExams(examId);
        if (examData) {
            setExams([examData]);
        } else {
            setExams([]); 
        }
    };

    useEffect(() => {
        fetchExams().then((data) => {
            if (data && data.success && Array.isArray(data.exams)) {
                const formattedData = data.exams
                  .filter(exam => exam != null)
                  .map(exam => ({
                      _id: exam._id,
                      examId: exam.examId,
                      patientId: exam.patientId,
                      age: exam.age,
                      sex: exam.sex,
                      zipCode: exam.zipCode,
                      bmi: exam.bmi,
                      keyFindings: exam.keyFindings,
                      brixiaScores: exam.brixiaScores,
                      imageURL: exam.imageURL
                  }));
                setExams(formattedData);
            } else {
                console.log("Invalid or empty data received:", data);
                setExams([]);
            }
        });
    }, []);

    return (
        <ExamsContext.Provider value={{ exams, loadExam }}>
            {children}
        </ExamsContext.Provider>
    );
};
