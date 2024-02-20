import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExamsContext } from './ExamsProvider';
import { useAdmin } from './AdminContext';
import ListView from './ListView';


const PatientDetail = () => {
    const { patientId } = useParams();
    const { currentExam, loadExamsByPatientId } = useContext(ExamsContext);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAdmin();

    useEffect(() => {
        const fetchExam = async () => {
            await loadExamsByPatientId(patientId);
            setLoading(false);
          };
          fetchExam();
    }, [loadExamsByPatientId, patientId]);

    // If exam is still loading, it will be null so we need to check for that
    var exams = null;
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    else {
        exams = currentExam.exams;
    }

    if (!exams) {
        return <div className="flex justify-center items-center h-screen">Exams not found.</div>;
    }
    var redirect = "/";
    if (isAdmin) {
        redirect = "/admin";
    }

    return (
        <div className="flex justify-center">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-4 mt-10">
                <h1 className="text-2xl font-semibold mb-4">Patient Details</h1>
                <p className="mb-2">Patient ID: {patientId}</p>
                <p className="mb-4">Number of Exams: {exams.length}</p>
                <ListView exams={exams.filter(exam => exam.patientId === patientId)} />
                <div className="text-center mt-4">
                    <Link 
                        to={redirect}
                        className="text-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PatientDetail;

