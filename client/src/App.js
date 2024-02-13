import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./components/Homescreen";
import DetailView from "./components/DetailView";
import AddView from "./components/AddView";
import { useState, useEffect } from "react";

// Placeholder call to fetch the exams data from the api
const fetchExams = async () => {
  try {
    const response = await fetch("https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams");
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

function App() {
  const [exams, setExams] = useState([]); // State to store exams data

  useEffect(() => {
    fetchExams().then((data) => {
      if (data && data.success && Array.isArray(data.exams)) {
        const formattedData = data.exams.reduce((acc, exam) => {
          // Check if exam is not null or undefined
          if (exam) {
            acc.push({
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
            });
          }
          return acc;
        }, []);
  
        setExams(formattedData);
      } else {
        console.log("Invalid or empty data received:", data);
        setExams([]);
      }
    });
  }, []);
  
  

  


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen exams={exams} />} />
          <Route
            path="/detail/:personId"
            element={
              <div className="p-40">
                {" "}
                <DetailView exam={exams} />{" "}
              </div>
            }
          />
          <Route
            path="/add"
            element={
              <div className="p-40">
                {" "}
                <AddView />{" "}
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
